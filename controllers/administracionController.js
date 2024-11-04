const TipoReclamo = require('../models/tipoReclamo');
const Reclamo = require('../models/reclamo');
const PDFDocument = require('pdfkit');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');
const fs = require('fs');

// Crear un nuevo tipo de reclamo
const crearTipoReclamo = async (req, res) => {
    try {
        const { descripcion } = req.body;
        const nuevoTipoReclamo = await TipoReclamo.create({ descripcion });
        res.status(201).json({ mensaje: 'Tipo de reclamo creado', tipoReclamo: nuevoTipoReclamo });
    } catch (error) {
        console.error('Error al crear el tipo de reclamo:', error);  // Registro del error en la consola
        res.status(500).json({ mensaje: 'Error al crear el tipo de reclamo', error });
    }
};

// Listar tipos de reclamos
const listarTiposReclamos = async (req, res) => {
    try {
        const tiposReclamos = await TipoReclamo.findAll();
        res.status(200).json(tiposReclamos);
    } catch (error) {
        console.error('Error al listar tipos de reclamos:', error);  // Registro del error en la consola
        res.status(500).json({ mensaje: 'Error al listar tipos de reclamos', error });
    }
};

// Generar informe en PDF
const generarInformePDF = async (req, res) => {
    const doc = new PDFDocument();
    const filePath = path.join(__dirname, `../informes/reclamos_${Date.now()}.pdf`);
    doc.pipe(fs.createWriteStream(filePath));
    doc.fontSize(25).text('Informe de Reclamos', { align: 'center' });

    try {
        const reclamos = await Reclamo.findAll();
        if (reclamos.length === 0) {
            doc.text('No hay reclamos para mostrar.');
        } else {
            reclamos.forEach(reclamo => {
                doc.text(`ID: ${reclamo.idReclamo} - Asunto: ${reclamo.asuntoReclamo}`);
            });
        }
        doc.end();

        // Descargar el archivo generado
        res.download(filePath, (err) => {
            if (err) {
                console.error('Error al descargar el archivo PDF:', err);  // Registro del error en la consola
                res.status(500).send('Error al descargar el archivo');
            }
            fs.unlinkSync(filePath); // Eliminar el archivo después de la descarga
        });
    } catch (error) {
        console.error('Error al generar el informe PDF:', error);  // Registro del error en la consola
        res.status(500).json({ mensaje: 'Error al generar el informe PDF', error });
    }
};

// Generar informe en CSV
const generarInformeCSV = async (req, res) => {
    const filePath = path.join(__dirname, `../informes/reclamos_${Date.now()}.csv`);
    const csvWriter = createCsvWriter({
        path: filePath,
        header: [
            { id: 'idReclamo', title: 'ID' },
            { id: 'asuntoReclamo', title: 'Asunto' },
            { id: 'fechaCreacionReclamo', title: 'Fecha Creación' }
        ]
    });

    try {
        const reclamos = await Reclamo.findAll();
        await csvWriter.writeRecords(reclamos);

        // Descargar el archivo generado
        res.download(filePath, (err) => {
            if (err) {
                console.error('Error al descargar el archivo CSV:', err);  // Registro del error en la consola
                res.status(500).send('Error al descargar el archivo');
            }
            fs.unlinkSync(filePath); // Eliminar el archivo después de la descarga
        });
    } catch (error) {
        console.error('Error al generar el informe CSV:', error);  // Registro del error en la consola
        res.status(500).json({ mensaje: 'Error al generar el informe CSV', error });
    }
};

module.exports = { crearTipoReclamo, listarTiposReclamos, generarInformePDF, generarInformeCSV };

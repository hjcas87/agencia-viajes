import { Testimonial } from '../model/Testimoniales.js';
import { Viaje } from '../model/Viajes.js';

export const paginaInicio = async (req, res) => {
    const promiseDB = [];

    promiseDB.push(Viaje.findAll({ limit: 3 }))
    promiseDB.push(Testimonial.findAll({ limit: 3 }))
    try {
        const resultado = await Promise.all(promiseDB)
        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1],
        });
    } catch (error) {
        console.log(error);
    }
};

export const paginaNosotros = (req, res) => {
    // req - lo que enviamos : res - lo que express nos responde
    res.render('nosotros', {
        pagina: 'Nosotros',
    });
};

export const paginaViajes = async (req, res) => {
    // req - lo que enviamos : res - lo que express nos responde
    const viajes = await Viaje.findAll();
    // console.log(viajes);

    res.render('viajes', {
        pagina: 'Proximos viajes',
        viajes,
    });
};
export const paginaDetalleViaje = async (req, res) => {
    // req - lo que enviamos : res - lo que express nos responde
    const { slug } = req.params;

    try {
        const viaje = await Viaje.findOne({ where: { slug } });
        res.render('viaje', {
            pagina: 'Informacion Viaje',
            viaje,
        });
    } catch (err) {
        console.log(err);
    }
};

export const paginaTestimoniales = async (req, res) => {
    try {
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales,
        });
    } catch (err) {
        console.log(err);
    }
};

// import F1Service from '../services/f1Service.js'
import PilotoF1Service from '../services/PilotoF1Service.js'



// const f1Service = new F1Service()
const pilotoF1Service = new PilotoF1Service()

class PilotoF1Controller {
    
    // trae todos los pilotos de la base de datos
    getPilotos = async (req, res) => {
        try {
            const piloto = await pilotoF1Service.getAllPilotos()
            res.json(piloto)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Error al obtener pilotos' })
        }
    }

    getPilotoById = async (req, res) => {
        try{
            const data = req.body
            const piloto = await pilotoF1Service.getPilotoById(data.piloto)
            res.status(200).send({
                success: true,
                message: piloto
            })
        }catch(error){
            res.status(400).send({
                success: false,
                message: error.message
            })
        }
    }
}
export default PilotoF1Controller
// //trae los pilotos desde la api 
// getPilotosFromApi = async (req, res) => {
//     try {
//         const piloto = await f1Service.getPilotos()
//         res.json(piloto)
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ error: 'Error al obtener pilotos' })
//     }
// }
// //guarda los pilotos en la base de datos
// syncPilotos = async (req, res) => {
//     try {
//         const pilotoFromApi = await f1Service.getPilotos()

//         const result = await pilotoF1Service.syncPilotos(pilotoFromApi)

//         res.status(200).json({
//             message: "Pilotos sincronizados correctamente",
//             result
//         })
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ error: error.message })
//     }
// }
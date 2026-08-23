import TorneoF1Service from "../services/TorneoF1Service.js"

class TorneoF1Controller{

    torneoF1Service = new TorneoF1Service()

    createTorneo = async (req,res) => {

        try{

            const {userId} = req.params
            const torneo = await this.torneoF1Service.createTorneo({...req.body, userId})

            res.status(200).send({
                success: true,
                torneo
            })
        }catch(error){

            res.status(400).send({
                success: false,
                message: error.message
            })
        }
    }


    joinTorneo = async (req, res) => {
    
        try {

            const {torneoId} = req.params;
            const {userId} = req.body

            const participante = await this.torneoF1Service.joinTorneo(userId,torneoId);

            res.status(200).send({
                success: true,
                participante
            });

        } catch (error) {

            res.status(400).send({
                success: false,
                message: error.message
            });

        }
    }

    getParticipantes = async (req, res) => {
    try {

        const { torneoId } = req.params;

        const participantes = await this.torneoF1Service.getParticipantes(torneoId);

        res.status(200).send({
            success: true,
            participantes
        });

    } catch (error) {

        res.status(400).send({
            success: false,
            message: error.message
        });

    }
}

    getAllTorneos = async (req,res) => {
        try{

            const torneos = await this.torneoF1Service.getAllTorneos()
            res.status(200).send({
                success: true,
                torneos
            })

        }catch(error){

            res.status(400).send({
                success: false,
                message: error.message
            })
        }
    }

        getTorneosByUsuario = async (req, res) => {
        try{
 
            const {userId} = req.params
            const torneos = await this.torneoF1Service.getTorneosByUsuario(userId)
 
            res.status(200).send({
                success: true,
                ...torneos
            })
 
        }catch(error){
 
            res.status(400).send({
                success: false,
                message: error.message
            })
        }
    }

    getTorneoById = async (req, res) => {
        try{

            const {id} = req.params
            const torneo = await this.torneoF1Service.getTorneoById(id)

            res.status(200).send({
                success: true,
                torneo
            })

        }catch(error){

            res.status(400).send({
                success: false,
                message: error.message
            })
        }
    }

    updateTorneo = async (req,res) => {

        try{
            const{id} = req.params

            const torneo = await  this.torneoF1Service.updateTorneo(id,req.body)

            res.status(200).send({
                success: true,
                torneo
            })

        }catch(error){

            res.status(400).send({
                success: false,
                message: error.message
            })
        }
    }

    deleteTorneo = async (req, res) => {
        try {
            
            const {id} = req.params

            const message = await this.torneoF1Service.deleteTorneo(id)

            res.status(200).send({
                success: true,
                message
            })

        } catch (error) {

            res.status(400).send({
                success: false,
                message: error.message
            })
        }
    }
}


export default TorneoF1Controller
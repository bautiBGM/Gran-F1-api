import Torneo from "../models/Torneo.js"
import Participantes from "../models/Participantes.js";
import Usuario from "../models/Usuario.js";

class TorneoF1Service {

    createTorneo = async (data) => {

        const torneo = await Torneo.create(data)

        await Participantes.findOrCreate({
            where: {
                userId: torneo.userId,
                torneoId: torneo.id
            }
        })

        return torneo
    }

    joinTorneo = async (userId, torneoId) => {


        const torneo = await this.getTorneoById(torneoId)
        const usuario = await Usuario.findByPk(userId)


        if (!usuario) {
        throw new Error("usuario no encontrado")
        }

        const yaParticipa = await Participantes.findOne({
            where: { userId, torneoId }
        })

        if (yaParticipa) {
            throw new Error("ya estás participando en este torneo")
        }

        const cantidadParticipantes = await Participantes.count({
            where: { torneoId }
        })

        if (torneo.maxJugadores && cantidadParticipantes >= torneo.maxJugadores) {
            throw new Error("el torneo ya alcanzó el máximo de jugadores")
        }

        const participante = await Participantes.create({
            userId,
            torneoId
        });

        return participante;
    }

    getParticipantes = async (torneoId) => {

        const torneo = await this.getTorneoById(torneoId)

        const torneoConParticipantes = await Torneo.findByPk(torneoId, {
        include: [
            {
                model: Usuario,
                as: "participantes",
                attributes: ["id", "name"],
                through: {
                    attributes: ["points"]
                }
            },
            {
                model: Usuario,
                as: "creador",
                attributes: ["id", "name"]
            }
        ]
    })

        return torneoConParticipantes
    }


    getAllTorneos = async () => {

        const torneos = await Torneo.findAll()

        return torneos
    }

    getTorneosByUsuario = async (userId) => {

        const usuario = await Usuario.findByPk(userId, {
            include: [
                { model: Torneo, as: "torneosCreados" },
                { model: Torneo, as: "torneos", through: { attributes: ["points"] } }
            ]
        })

        if (!usuario) {
            throw new Error("usuario no encontrado")
        }

        return {
            creados: usuario.torneosCreados,
            participando: usuario.torneos
        }
    }


    getTorneoById = async (id) => {

        const torneo = await Torneo.findByPk(id)

        if(!torneo){
            throw new Error("torneo no encontrado")
        }

        return torneo
    }

    updateTorneo = async (id,data) => {
        const torneo = await this.getTorneoById(id)

        await torneo.update(data)
        
        return torneo
    }

    deleteTorneo = async (id) => {
        const torneo = await this.getTorneoById(id)

        if(!torneo){
            throw new Error("torneo no encontrado")
        }

        await torneo.destroy()

        return "torneo eliminado"

    }
}

export default TorneoF1Service
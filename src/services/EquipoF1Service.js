import Equipo from "../models/Equipo.js"
import Piloto from "../models/Piloto.js"
import Constructor from "../models/Constructor.js"



class EquipoF1Service {

    createEquipo = async (userId) => {
        const equipo = await Equipo.create({
            userId
        })

        return equipo
    }

    getEquipoByUser = async (userId) => {

        const equipo = await Equipo.findOne({
            where: { userId },
            include: [
                { model: Piloto, as: "pilot1" },
                { model: Piloto, as: "pilot2" },
                { model: Constructor, as: "team"}
            ]
        })

        if(!equipo){
            throw new Error("equipo no encontrado")
        }

        return equipo
    }

updateEquipo = async (userId, data) => {
    

    console.log("datos que llegan al back: ", data);
    
    const equipo = await Equipo.findOne({
        where: { userId }
    })


    if(!equipo){
        throw new Error("equipo no encontrado")
    }
    if(data.pilot1Id){

        const piloto = await Piloto.findByPk(data.pilot1Id)

        if(equipo.budget < piloto.price){
            throw new Error("presupuesto insuficiente")
        }

        data.budget = equipo.budget - piloto.price
    }

    // Quitar piloto 1
    if(data.pilot1Id === null && equipo.pilot1Id){

        const piloto = await Piloto.findByPk(equipo.pilot1Id)

        data.budget = equipo.budget + piloto.price
    }

    if(data.pilot2Id){

    const piloto = await Piloto.findByPk(data.pilot2Id)

    if(equipo.budget < piloto.price){

        throw new Error("presupuesto insuficiente")
    }

    data.budget = equipo.budget - piloto.price
    }

    // Quitar piloto 2
    if(data.pilot2Id === null && equipo.pilot2Id){

        const piloto = await Piloto.findByPk(equipo.pilot2Id)

        data.budget = equipo.budget + piloto.price
    }

    if(data.constructorId){

    const constructor = await Constructor.findByPk(data.constructorId)

    if(equipo.budget < constructor.price){

        throw new Error("presupuesto insuficiente")
    }

    data.budget = equipo.budget - constructor.price
    }

    // Quitar constructor 
    if(data.constructorId === null && equipo.constructorId){

        const constructor = await Constructor.findByPk(equipo.constructorId)

        data.budget = equipo.budget + constructor.price
    }

    await equipo.update(data)

    return equipo
}
}

export default EquipoF1Service
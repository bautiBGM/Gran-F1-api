import Usuario from "./Usuario.js"
import Piloto from "./Piloto.js"
import Constructor from "./Constructor.js"
import Equipo from "./Equipo.js"
import Torneo from "./Torneo.js"
import Participantes from "./Participantes.js"

// relaciones

Usuario.hasOne(Equipo, { foreignKey: "userId" })

Equipo.belongsTo(Usuario, { foreignKey: "userId"})

Equipo.belongsTo(Piloto, { as: "pilot1", foreignKey: "pilot1Id" })

Equipo.belongsTo(Piloto, { as: "pilot2", foreignKey: "pilot2Id" })

Equipo.belongsTo(Constructor, {as: "team",foreignKey: "constructorId"})

Usuario.hasMany(Torneo, {as: "torneosCreados",foreignKey: "userId",})

Torneo.belongsTo(Usuario, {as: "creador",foreignKey: "userId"})

Usuario.belongsToMany(Torneo, {through: Participantes,as: "torneos",foreignKey: "userId"})

Torneo.belongsToMany(Usuario, {through: Participantes,as: "participantes",foreignKey: "torneoId"})

export {
    Usuario,
    Piloto,
    Constructor,
    Equipo,
    Torneo,
    Participantes
}
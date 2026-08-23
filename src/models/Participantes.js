import { DataTypes, Model } from "sequelize";
import connection from "../db/connection.js";

class Participantes extends Model {}

Participantes.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
},{
    sequelize: connection,
    modelName: "Participantes"
})

export default Participantes
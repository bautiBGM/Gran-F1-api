import { DataTypes, Model } from "sequelize";
import connection from "../db/connection.js";


class Torneo extends Model{}

Torneo.init ({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    maxJugadores: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize: connection,
    modelName: "Torneo"
});

export default Torneo;
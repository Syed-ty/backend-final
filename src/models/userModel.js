const {DataTypes, Model, Sequelize} = require('sequelize')

module.exports = class UserModele extends Model {
    static initModel(connection) {
        this.init(
        {
            name:{
                type:DataTypes.STRING,
                field:'name'
            },
            comment:{
                type:DataTypes.STRING,
                allowNull: false,
                field:'comment'
            },
            id:{
                type:DataTypes.STRING,
                primaryKey:true,
                field:'id'
            },
            CurrentDate:{
                type:DataTypes.DATE,
                field:'currentdate'
            }
        },
        {
            sequelize: connection,
            modelName:'comments',
            timestamps:false
        }
        )
    }

}
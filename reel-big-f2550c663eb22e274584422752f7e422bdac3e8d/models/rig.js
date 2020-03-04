"use strict"
module.exports = function(sequelize, DataTypes)
{
    var Rig = sequelize.define("Rig",{
    
        rig_id:
        {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        rig_name: 
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        rod: DataTypes.STRING,

        reel: DataTypes.STRING,

        tackle: DataTypes.STRING,

        info: DataTypes.TEXT,

        createdAt: 
        {
            type: DataTypes.DATE,
            field: 'beginTime',
            defaultValue: sequelize.literal('NOW()')
        },
        updatedAt: 
        {
            type: DataTypes.DATE,
            field: 'beginTime',
            defaultValue: sequelize.literal('NOW()')
        }
        }, {
            timestamps: true,
        
            freezeTableName: true        
        
    });
    return Rig;
};
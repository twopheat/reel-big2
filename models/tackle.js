"use strict"
module.exports = function(sequelize, DataTypes)
{
    var Tackle = sequelize.define("Tackle",
    {
        Tackle_id:
        {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        currentRod: DataTypes.STRING,

        currentBait: DataTypes.STRING,

        currentBaitAmount: DataTypes.INTEGER,

        currentLure: DataTypes.STRING, 

        currentLureAmount: DataTypes.INTEGER,

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
    return Tackle;
}
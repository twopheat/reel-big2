"use strict"
module.exports = function(sequelize, DataTypes)
{
    var CatchHistory = sequelize.define("CatchHistory",{
        catch_id:
        {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        fish_type: DataTypes.STRING,
        
        lat: DataTypes.DECIMAL(10, 7),
        
        lng: DataTypes.DECIMAL(10, 7),

        rig_type: DataTypes.STRING,

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
    return CatchHistory;
};
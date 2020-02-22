"use strict"
module.exports = function(sequelize, DataTypes)
{
    var User = sequelize.define("User",
    {
        User_id:
        {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        username:
        {
            type: DataTypes.STRING,
            allowNull: false
        },

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
    return User;
};
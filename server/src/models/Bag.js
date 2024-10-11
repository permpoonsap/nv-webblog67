module.exports = (sequelize, DataTypes) => {
    const Bag = sequelize.define('Bag', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        bagID: {
            type: DataTypes.STRING,
            unique: true, 
            allowNull: false, 
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        category: {
            type: DataTypes.TEXT,
            allowNull: true, 
        },
        material: {
            type: DataTypes.STRING,
            allowNull: true, 
        },
        color: {
            type: DataTypes.STRING,
            allowNull: true, 
        },
        size: {
            type: DataTypes.STRING,
            allowNull: true, 
        },
        price: {
            type: DataTypes.DECIMAL(10, 2), 
            allowNull: false, 
        },
        pictures: {
            type: DataTypes.STRING, 
            allowNull: false, 
        },
    }, {
        timestamps: true, 
    });

    return Bag;
}

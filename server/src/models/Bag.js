module.exports = (sequelize, DataTypes) => {
    const Bag = sequelize.define('Bag', {
        bagID: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        name: DataTypes.STRING,
        brand: DataTypes.STRING,
        category: DataTypes.STRING,
        material: DataTypes.STRING,
        color: DataTypes.STRING,
        size: DataTypes.STRING,
        price: DataTypes.DECIMAL(10, 2),
        thumbnail: DataTypes.STRING,
        pictures: DataTypes.TEXT
    });

    return Bag;
};

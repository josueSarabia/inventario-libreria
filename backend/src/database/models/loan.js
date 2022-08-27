const { DataTypes } = require("sequelize")

const loan = {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    user: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    returnDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    bookCode: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'books',
          key: 'code',
        }
    }
}

module.exports = loan
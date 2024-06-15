import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('4Star', 'postgres', 'admin', {
    host: 'localhost',
    dialect: 'postgres'
});

try {
    await sequelize.authenticate();
    console.log('Connection successfull');
} catch(error) {
    console.error('Unable to connect :(');
};

const Movie = sequelize.define('Movie', {
    //model attributes (column names)
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: DataTypes.INTEGER,
    director: DataTypes.STRING,
    lead_actor: DataTypes.STRING,
    support_actor: DataTypes.STRING,
    genre: DataTypes.STRING,
    type: DataTypes.STRING

})

sequelize.close();
export{ Movie }; 

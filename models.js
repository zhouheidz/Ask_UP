const Sequelize = require('sequelize');
const database = require('./database');

const User = database.define('users', {
	email: {
		type: Sequelize.STRING,
		primaryKey: true,
		allowNull: false
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	role: {
		type: Sequelize.STRING,
		allowNull: false
	},createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
});

const Question = database.define('questions',{
	id:{
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	user_email: {
		type: Sequelize.STRING,
		references: {
            model: 'users',
            key: 'email'
        }
	},
	timestamp: {
    	type: Sequelize.DATE
    },
    content:{
    	type: Sequelize.TEXT,
    	allowNull: false
    }
});

const QResponse = database.define('qresponses',{
	id:{
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	user_email: {
		type: Sequelize.STRING,
		references: {
            model: 'users',
            key: 'email'
        }
	},
	q_id:{
		type: Sequelize.INTEGER,
		references: {
            model: 'questions',
            key: 'id'
        }
	},
	timestamp: {
    	type: Sequelize.DATE
    },
    content: {
    	type: Sequelize.TEXT,
    	allowNull: false
    },
    image: {
    	type: Sequelize.ARRAY(Sequelize.STRING),
    	allowNull: false
    }
});

const Problem = database.define('problems',{
	id:{
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	user_email: {
		type: Sequelize.STRING,
		references: {
            model: 'users',
            key: 'email'
        }
	},
	timestamp: {
    	type: Sequelize.DATE
    },
    content:{
    	type: Sequelize.TEXT,
    	allowNull: false
    },
    category: {
    	type: Sequelize.STRING,
    	allowNull: false
    },
    publicity: {
    	type: Sequelize.BOOLEAN,
    	allowNull: false
    }
});

const PResponse = database.define('presponses',{
	id:{
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	user_email: {
		type: Sequelize.STRING,
		references: {
            model: 'users',
            key: 'email'
        }
	},
	q_id:{
		type: Sequelize.INTEGER,
		references: {
            model: 'problems',
            key: 'id'
        }
	},
	timestamp: {
    	type: Sequelize.DATE
    },
    content: {
    	type: Sequelize.TEXT,
    	allowNull: false
    },
    image: {
    	type: Sequelize.STRING,
    	allowNull: false
    }
});

database.sync();

module.exports.User = User;
module.exports.Question = Question;
module.exports.QResponse = QResponse;
module.exports.Problem = Problem;
module.exports.PResponse = PResponse;
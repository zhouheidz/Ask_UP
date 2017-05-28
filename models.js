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
		type: Sequelize.ENUM,
		values: ['student', 'admin'],
		allowNull: false
	},createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
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
    	type: Sequelize.DATE,
    	allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    content:{
    	type: Sequelize.TEXT,
    	allowNull: false
    },
    resolved:{
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
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
    	type: Sequelize.DATE,
    	allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    content: {
    	type: Sequelize.TEXT,
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
    	type: Sequelize.DATE,
    	allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    content:{
    	type: Sequelize.TEXT,
    	allowNull: false
    },
    category: {
    	type: Sequelize.ENUM,
    	values: ['org-related', 'course-related', 'facility-related',
    			'admin-related', 'others'],
    	allowNull: false
    },
    publicity: {
    	type: Sequelize.BOOLEAN,
    	allowNull: false
    },
    resolved:{
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
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
	p_id:{
		type: Sequelize.INTEGER,
		references: {
            model: 'problems',
            key: 'id'
        }
	},
	timestamp: {
    	type: Sequelize.DATE,
    	allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    content: {
    	type: Sequelize.TEXT,
    	allowNull: false
    }
});
const Faq = database.define('faqs', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    reply: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
	timestamps: true
});

database.sync();

module.exports.User = User;
module.exports.Question = Question;
module.exports.QResponse = QResponse;
module.exports.Problem = Problem;
module.exports.PResponse = PResponse;
module.exports.Faq = Faq;

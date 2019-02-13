const axios = require('axios');

let config;

exports.validEmployee = (req, res, next) => {
    config = {
        headers: {'Authorization': "bearer " + req.headers.authorization.split(' ')[1]}
    };
    axios.get('http://localhost:5000/users/authEmployee', config)
    .then((response) => {
        next();
    })
    .catch((err) => {
        next(err.response);
    });
};

exports.validAdmin = (req, res, next) => {
    config = {
        headers: {'Authorization': "bearer " + req.headers.authorization.split(' ')[1]}
    };
    axios.get('http://localhost:5000/users/authAdmin', config)
    .then((response) => {
        next();
    })
    .catch((err) => {
        next(err.response);
    });
};

exports.getAccounts = (pancard) => {
    return axios.get('http://localhost:3000/accounts/pancard/' + pancard, config)
}

exports.deleteAccounts = (pancard) => {
    return axios.delete('http://localhost:3000/accounts/pancard/' + pancard, config)
}
const fs = require('fs');
const express = require('express');

//  es6
// import { readFileSync, writeFile } from 'fs';
// import express, { json } from 'express';
const app = express();

app.use(express.json()); //middleware

app.use((req, res, next) => {
    console.log('Hello from the middlewre');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);


const getAllTours = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'sucess',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    });
}

const getTour = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;
    // if (id > tours.length) {
    const tour = tours.find(el => el.id === id);
    if (!tour) {
        return res.status('404').json({
            status: 'fail',
            message: 'invalid ID'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
}

const createTour = (req, res) => {
    //console.log(req.body);
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({
        id: newId
    }, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'sucess',
            data: {
                tour: newTour
            }
        });
    });
}

const updateTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status('404').json({
            status: 'fail',
            message: 'Invalid Id'
        })
    }
    return res.status('200').json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>'
        }
    });
}

const deleteTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status('404').json({
            status: 'fail',
            message: 'Invalid Id'
        })
    }
    return res.status('204').json({
        status: 'success',
        data: null
    });
}

const getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
}

const getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
}
const createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
}

const updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
}

const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
}

// TOUR ROUTES
app.route('/api/v1/tours').get(getAllTours).post(createTour);
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);

// USER ROUTES
app.route('/api/v1/users').get(getAllUsers).post(createUser);
app.route('/api/v1/users/:id').get(getUser).patch(updateUser).delete(deleteUser);


// START SERVER
const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

// Routing means basically to determine how an application react to a certain client request, so to a certain url
// Routing means basically to determine how an application react to a certain client request, so to a certain url
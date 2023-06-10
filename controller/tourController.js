const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const idValidator = (req, res) => {
  const id = req.params.id;
  const tour = tours.find((el) => el.id === id);
  return tour;
};

exports.checkID = (req, res, next) => {
  const tour = idValidator(req, res);
  if (!tour) {
    return res.status(404).json({
      status: 'FAIL',
      data: {
        message: 'invalid ID',
      },
    });
  }
  next();
};

exports.checkBody = (req,res,next)=>{


  if(!req.body.price || !req.body.name){
    return res.status(400).json({
      status: 'Fail',
      message: 'bad request'
    })
  }

  next()
  
}


exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

//Create tours function
exports.createTours = (req, res) => {

  const newId = uuidv4();
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours, null, 2),
    (err) => {
      res.status(201).json({
        status: 'success',
        createdAt: req.requestTime,
        data: {
          tour: newTour,
        },
      });
    }
  );
};

//GET SINGLE TOUR
exports.getSingleTour = (req, res) => {
  const tour = idValidator(req, res);
  console.log(tour.id);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

//function to update single tour
exports.updateSingleTours = (req, res) => {
  const tour = idValidator(req, res);

  const patchTour = Object.assign(tour, {
    name: req.body.name,
    duration: req.body.duration,
    maxGroupSize: req.body.maxGroupSize,
    difficulty: req.body.difficulty,
    ratingsAverage: req.body.ratingsAverage,
    ratingsQuantity: req.body.ratingsQuantity,
    price: req.body.price
   
  });
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours, null, 2),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: patchTour,
        },
      });
    }
  );
};
exports.deleteTour = (req, res) => {
  const id = req.params.id;
  const indexDeletedTour = tours.findIndex((el) => el.id === id);
  tours.splice(indexDeletedTour, 1);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours, null, 2),
    (err) => {
      res.status(202).json({
        status: 'success',
        data: {
          tour: null,
        },
      });
    }
  );
};

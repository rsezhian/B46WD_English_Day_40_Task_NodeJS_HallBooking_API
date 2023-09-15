const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 4001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const myRooms = [
  {
    roomID: "GXH2331",
    roomName: "luxury1",
    seats_available: 25,
    amenities: ["Sony LED TV", "Refrigirator", "AC", "Internet"],
    price: 7500,
    room_booking_status: [
      {
        booking_status: "booking complete",
        cust_name: "Ravichandran",
        date_booked: new Date("2023-11-20"),
        start_time: "07:00",
        end_time: "23:00",
      },
    ],
  },
  {
    roomID: "GXH2332",
    roomName: "luxury2",
    seats_available: 50,
    amenities: ["REDMI LED TV", "Refrigirator", "AC", "Internet"],
    price: 5000,
    room_booking_status: [
      {
        booking_status: "booking complete",
        cust_name: "Neeraj",
        date_booked: "2023-10-25",
        start_time: "09:00",
        end_time: "22:00",
      },
    ],
  },
  {
    roomID: "GXH2333",
    roomName: "luxury3",
    seats_available: 10,
    amenities: ["Apple LED TV", "Refrigirator", "AC", "Internet"],
    price: 5000,
    room_booking_status: [
      {
        booking_status: "booking complete",
        cust_name: "Nishant",
        date_booked: "2023-10-30",
        start_time: "08:00",
        end_time: "21:00",
      },
    ],
  },
];

//
// home page
app.get("/", (req, res) => {
  res.send("Hall Booking API Project Home Page");
});

// create a new room service
app.post("/createroom", (req, res) => {
  let myNewRoom = {
    roomID: "GXH" + req.body.roomID,
    roomName: req.body.roomName,
    seats_available: req.body.seats_available,
    amenities: req.body.amenities,
    price: req.body.price,
  };
  myRooms.push(myNewRoom);
  res.json(myRooms);
});

// booking a room
app.post("/bookroom", (req, res) => {
  let room_booking_status = {
    roomID: req.body.roomID,
    cust_name: req.body.cust_name,
    date_booked: req.body.date_booked,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    booking_status: "booking complete",
  };
  for (let index in myRooms) {
    if (myRooms[index].roomID === room_booking_status.roomID) {
      myRooms[index].room_booking_status.forEach((item) => {
        if (
          item.date_booked === room_booking_status.date_booked ||
          (item.start_time === room_booking_status.start_time &&
            item.end_time === room_booking_status.end_time)
        ) {
          res.status(400).send("Please book another slot !!!");
        } else {
          myRooms[index].room_booking_status.push(room_booking_status);
          res.status(200).send(myRooms);
        }
      });
    } else {
      console.log("Check the details, because something went wrong !!!");
    }
  }
});

// get all room details
app.get("/getrooms", (req, res) => {
  let myRoomsArray = [];
  for (let index in myRooms) {
    myRooms[index].room_booking_status.forEach((item) => {
      let myNewRoomArray = {
        "room name": myRooms[index].roomName,
        "booked status": item.booking_status,
        "customer name": item.cust_name,
        date: item.date_booked,
        "start time": item.start_time,
        "end time": item.end_time,
      };
      myRoomsArray.push(myNewRoomArray);
    });
  }
  res.send(myRoomsArray);
});

// list all customers
app.get("/getcustomers", (req, res) => {
  let myCustArray = [];
  for (let index in myRooms) {
    myRooms[index].room_booking_status.forEach((item) => {
      let myNewCustArray = {
        "customer name": item.cust_name,
        "room name": myRooms[index].roomName,
        date: item.date_booked,
        "start time": item.start_time,
        "end time": item.end_time,
      };
      myCustArray.push(myNewCustArray);
    });
  }
  res.send(myCustArray);
});

//
//
//
//
//
//
//
//
//
//
//
//
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

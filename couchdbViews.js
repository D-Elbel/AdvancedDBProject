//findItaly

//map
function(doc) {
    if (doc.Country === "IT") {
      emit(doc.Country, doc);
    }
  }

//reduce
null

//groupLevel3

//map
function(doc) {
    if (doc.Country && doc.Riders) {
      for (var i = 0; i < doc.Riders.length; i++) {
        var rider = doc.Riders[i];
        emit([doc.Country, rider.name], {
          "Victories": parseInt(rider.Victories) || 0,
          "NumberofSecond": parseInt(rider.NumberofSecond) || 0,
          "NumberofThird": parseInt(rider.NumberofThird) || 0,
          "Numberof4th": parseInt(rider.Numberof4th) || 0,
          "Numberof5th": parseInt(rider.Numberof5th) || 0,
          "Numberof6th": parseInt(rider.Numberof6th) || 0
        });
      }
    }
  }

//reduce
function(keys, values, rereduce) {
    var result = {
      "Victories": 0,
      "NumberofSecond": 0,
      "NumberofThird": 0,
      "Numberof4th": 0,
      "Numberof5th": 0,
      "Numberof6th": 0
    };
  
    for (var i = 0; i < values.length; i++) {
      result.Victories += values[i].Victories;
      result.NumberofSecond += values[i].NumberofSecond;
      result.NumberofThird += values[i].NumberofThird;
      result.Numberof4th += values[i].Numberof4th;
      result.Numberof5th += values[i].Numberof5th;
      result.Numberof6th += values[i].Numberof6th;
    }
  
    return result;
  }

//hundredPlusVictories
//map
function(doc) {
    if (doc.Country && doc.Riders && Array.isArray(doc.Riders)) {
      var totalVictories = 0;
      doc.Riders.forEach(function(rider) {
        if (rider.Victories) {
          totalVictories += parseInt(rider.Victories, 10);
        }
      });
      
      if (totalVictories > 100) {
        emit(null, doc);
      }
    }
  }
//reduce
_sum

//riderVictoriesPerCountry
//map
function(doc) {
    if (doc.Country && doc.Riders && Array.isArray(doc.Riders)) {
      doc.Riders.forEach(function(rider) {
        if (rider.Victories) {
          emit(doc.Country, parseInt(rider.Victories, 10));
        }
      });
    }
  }

  //reduce 
  _sum


//riderVictoriesPerCountryStats
function(doc) {
    if (doc.Country && doc.Riders && Array.isArray(doc.Riders)) {
      doc.Riders.forEach(function(rider) {
        if (rider.Victories) {
          emit(doc.Country, parseInt(rider.Victories, 10));
        }
      });
    }
  }

//reduce
_stats

//ridersPerCountry
function(doc) {
    if (doc.Country && doc.Riders && Array.isArray(doc.Riders)) {
      doc.Riders.forEach(function(rider) {
        if (rider.name) {
          emit(doc.Country, 1);
        }
      });
    }
  }

  //reduce
  _count

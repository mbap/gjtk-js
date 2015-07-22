var GeoJSON = require('../GeoJSON');
var assert = require('assert');

///////// VALID DATA \\\\\\\\\
var valid = {

  Position: function () {
    var length = (Math.round(Math.random()*100)%6)+2;
    var Position = [];
    for (var i=0; i < length; ++i) {
        Position.push((Math.random()-0.5)*100);
    };
    return Position;
  },

  PointCoordinates: function () {
      return valid.Position();
  },

  MultiPointCoordinates: function () {
    var length = Math.round(Math.random()*100)%6;
    var MultiPointCoordinates = [];
    for (var i=0; i < length; ++i) {
        MultiPointCoordinates.push(valid.Position());
    };
    return MultiPointCoordinates;
  },

  LineStringCoordinates: function () {
    var length = (Math.round(Math.random()*100)%6)+2;
    var LineStringCoordinates = [];
    for (var i=0; i < length ;++i) {
        LineStringCoordinates.push(valid.Position());
    };
    return LineStringCoordinates;
  },

  LinearRingCoordinates: function () {
    var LinearRingCoordinates = [];
    var origin = valid.Position();
    LinearRingCoordinates.push(origin);
    LinearRingCoordinates = LinearRingCoordinates.concat(valid.LineStringCoordinates());
    LinearRingCoordinates.push(origin);
    return LinearRingCoordinates;
  },

  MultiLineStringCoordinates: function () {
    var length = Math.round(Math.random()*100)%6;
    var MultiLineStringCoordinates = [];
    for (var i=0; i < length; ++i) {
        MultiLineStringCoordinates.push(valid.LineStringCoordinates());
    };
    return MultiLineStringCoordinates;
  },

  PolygonCoordinates: function () {
    var PolygonCoordinates = [
      [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ],
      [ [100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2] ]
    ];
    if (Math.random() < 0.5) {
      PolygonCoordinates = [valid.LinearRingCoordinates()];
    }
    return PolygonCoordinates;
  },

  MultiPolygonCoordinates: function () {
    var length = Math.round(Math.random()*100)%6;
    var MultiPolygonCoordinates = [];
    for (var i=0; i < length; ++i) {
        MultiPolygonCoordinates.push(valid.PolygonCoordinates());
    };
    return MultiPolygonCoordinates;
  },

  Geometry: function () {
    var Geometries = [
      valid.Point(),
      valid.MultiPoint(),
      valid.LineString(),
      valid.MultiLineString(),
      valid.Polygon(),
      valid.MultiPolygon(),
      valid.GeometryCollection()
    ];
    return Geometries[Math.floor(Math.random()*Geometries.length)];
  },

  Point: function () {
    return {
      "type": "Point",
      "coordinates": valid.PointCoordinates()
    };
  },

  MultiPoint: function () {
    return {
      "type": "MultiPoint",
      "coordinates": valid.MultiPointCoordinates()
    };
  },

  LineString: function () {
    return {
      "type": "LineString",
      "coordinates": valid.LineStringCoordinates()
    };
  },

  MultiLineString: function () {
    return {
      "type": "MultiLineString",
      "coordinates": valid.MultiLineStringCoordinates()
    };
  },

  Polygon: function () {
    return {
      "type": "Polygon",
      "coordinates": valid.PolygonCoordinates()
    };
  },

  MultiPolygon: function () {
    return {
      "type": "MultiPolygon",
      "coordinates": valid.MultiPolygonCoordinates()
    };
  },

  GeometryCollection: function () {
    var length = Math.round(Math.random()*100)%3;
    var geometries = [];
    for (var i=0; i < length; ++i) {
        geometries.push(valid.Geometry());
    };
    return {
      "type": "GeometryCollection",
      "geometries": geometries
    };
  },

  Feature: function () {
    return {
      "type": "Feature",
      "geometry": valid.Geometry(),
      "properties": null
    }
  },

  FeatureCollection: function () {
    var length = Math.round(Math.random()*100)%6;
    var features = [];
    for (var i=0; i < length; ++i) {
        features.push(valid.Feature());
    };
    return {
      "type": "FeatureCollection",
      "features": features
    };
  },

  CRS: function () {
    var crs = {
      "type": "name",
      "properties": {
        "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
      }
    };
    if (Math.random() < 0.5) {
      crs = {
        "type": "link",
        "properties": valid.Link()
      };
    };
    return crs;
  },

  Link: function () {
    return {
      "href": "data.crs",
      "type": "ogcwkt"
    };
  },

  Bbox: function () {
    return [-180.0, -90.0, 180.0, 90.0];
  }

};

/////////////////// GEOJSON TESTS \\\\\\\\\\\\\\\\\\\
describe('GeoJSON', function () {

////////////////// VALIDATION TESTS \\\\\\\\\\\\\\\\\
  describe('isGeoJSON', function () {
    it('should return true when provided a valid Geometry object', function () {
      assert(GeoJSON.isGeoJSON(valid.Geometry()));
    });
    it('should return true when provided a valid Feature object', function () {
      assert(GeoJSON.isGeoJSON(valid.Feature()));
    });
    it('should return true when provided a valid FeatureCollection object', function () {
      assert(GeoJSON.isGeoJSON(valid.FeatureCollection()));
    });
  });

  describe('isGeometry', function () {
    it('should return true when provided a valid Point object', function () {
      assert(GeoJSON.isGeometry(valid.Point()));
    });
    it('should return true when provided a valid MultiPoint object', function () {
      assert(GeoJSON.isGeometry(valid.MultiPoint()));
    });
    it('should return true when provided a valid LineString object', function () {
      assert(GeoJSON.isGeometry(valid.LineString()));
    });
    it('should return true when provided a valid MultiLineString object', function () {
      assert(GeoJSON.isGeometry(valid.MultiLineString()));
    });
    it('should return true when provided a valid Polygon object', function () {
      assert(GeoJSON.isGeometry(valid.Polygon()));
    });
    it('should return true when provided a valid MultiPolygon object', function () {
      assert(GeoJSON.isGeometry(valid.MultiPolygon()));
    });
    it('should return true when provided a valid GeometryCollection object', function () {
      assert(GeoJSON.isGeometry(valid.GeometryCollection()));
    });
  });

  describe('isPosition', function () {
    it('should return true when provided an array of at least 2 numbers', function () {
      assert(GeoJSON.isPosition(valid.Position()));
    });
    it('should return false when provided an array of less than 2 numbers', function () {
      assert(!GeoJSON.isPosition([1]));
    });
    it('should return false when provided an array of less than 2 non-numbers', function () {
      assert(!GeoJSON.isPosition(['a']));
    });
    it('should return false when provided an array of at least 2 non-numbers', function () {
      assert(!GeoJSON.isPosition(['foo', 'bar']));
    });
    it('should return false when provided an array of a mix of at least 2 numbers and non-numbers', function () {
      assert(!GeoJSON.isPosition([1, 'a']));
    });
    it('should return false when provided nothing', function () {
      assert(!GeoJSON.isPosition());
    });
  });

  describe('isPointCoordinates', function () {
    it('should return true when provided valid GeoJSON Point coordinates', function () {
      assert(GeoJSON.isPointCoordinates(valid.PointCoordinates()));
    });
  });

  describe('isMultiPointCoordinates', function () {
    it('should return true when provided valid GeoJSON MultiPoint coordinates', function () {
      assert(GeoJSON.isMultiPointCoordinates(valid.MultiPointCoordinates()));
    });
  });

  describe('isLineStringCoordinates', function () {
    it('should return true when provided valid GeoJSON LineString coordinates', function () {
      assert(GeoJSON.isLineStringCoordinates(valid.LineStringCoordinates()));
    });
  });

  describe('isLinearRingCoordinates', function () {
    it('should return true when provided a valid GeoJSON LinearRing', function () {
      assert(GeoJSON.isLinearRingCoordinates(valid.LinearRingCoordinates()));
    });
  });

  describe('isMultiLineStringCoordinates', function () {
    it('should return true when provided valid GeoJSON MultiLineString coordinates', function () {
      assert(GeoJSON.isMultiLineStringCoordinates(valid.MultiLineStringCoordinates()));
    });
  });

  describe('isPolygonCoordinates', function () {
    it('should return true when provided valid GeoJSON Polygon coordinates', function () {
      assert(GeoJSON.isPolygonCoordinates(valid.PolygonCoordinates()));
    });
  });

  describe('isMultiPolygonCoordinates', function () {
    it('should return true when provided valid GeoJSON MultiPolygon coordinates', function () {
      assert(GeoJSON.isMultiPolygonCoordinates(valid.MultiPolygonCoordinates()));
    });
  });

  describe('isPoint', function () {
    it('should return true when provided a valid Point object', function () {
      assert(GeoJSON.isPoint(valid.Point()));
    });
    it('should return false when provided a Point object without a type', function () {
      var Point = valid.Point();
      delete Point.type;
      assert(!GeoJSON.isPoint(Point));
    });
    it('should return false when provided a Point object without coordinates', function () {
      var Point = valid.Point();
      delete Point.coordinates;
      assert(!GeoJSON.isPoint(Point));
    });
    it('should return false when provided nothing', function () {
      assert(!GeoJSON.isPoint());
    });
  });

  describe('isMultiPoint', function () {
    it('should return true when provided a valid MultiPoint object', function () {
      assert(GeoJSON.isMultiPoint(valid.MultiPoint()));
    });
    it('should return false when provided a MultiPoint object without a type', function () {
      var MultiPoint = valid.MultiPoint();
      delete MultiPoint.type;
      assert(!GeoJSON.isMultiPoint(MultiPoint));
    });
    it('should return false when provided a MultiPoint object without coordinates', function () {
      var MultiPoint = valid.MultiPoint();
      delete MultiPoint.coordinates;
      assert(!GeoJSON.isMultiPoint(MultiPoint));
    });
    it('should return false when provided nothing', function () {
      assert(!GeoJSON.isMultiPoint());
    });
  });

  describe('isLineString', function () {
    it('should return true when provided a valid LineString object', function () {
      assert(GeoJSON.isLineString(valid.LineString()));
    });
    it('should return false when provided a LineString object without a type', function () {
      var LineString = valid.LineString();
      delete LineString.type;
      assert(!GeoJSON.isLineString(LineString));
    });
    it('should return false when provided a LineString object without coordinates', function () {
      var LineString = valid.LineString();
      delete LineString.coordinates;
      assert(!GeoJSON.isLineString(LineString));
    });
    it('should return false when provided nothing', function () {
      assert(!GeoJSON.isLineString());
    });
  });

  describe('isMultiLineString', function () {
    it('should return true when provided a valid MultiLineString object', function () {
      assert(GeoJSON.isMultiLineString(valid.MultiLineString()));
    });
    it('should return false when provided a MultiLineString object without a type', function () {
      var MultiLineString = valid.MultiLineString();
      delete MultiLineString.type;
      assert(!GeoJSON.isMultiLineString(MultiLineString));
    });
    it('should return false when provided a MultiLineString object without coordinates', function () {
      var MultiLineString = valid.MultiLineString();
      delete MultiLineString.coordinates;
      assert(!GeoJSON.isMultiLineString(MultiLineString));
    });
    it('should return false when provided nothing', function () {
      assert(!GeoJSON.isMultiLineString());
    });
  });

  describe('isPolygon', function () {
    it('should return true when provided a valid Polygon object', function () {
      assert(GeoJSON.isPolygon(valid.Polygon()));
    });
    it('should return false when provided a Polygon object without a type', function () {
      var Polygon = valid.Polygon();
      delete Polygon.type;
      assert(!GeoJSON.isPolygon(Polygon));
    });
    it('should return false when provided a Polygon object without coordinates', function () {
      var Polygon = valid.Polygon();
      delete Polygon.coordinates;
      assert(!GeoJSON.isPolygon(Polygon));
    });
    it('should return false when provided nothing', function () {
      assert(!GeoJSON.isPolygon());
    });
  });

  describe('isMultiPolygon', function () {
    it('should return true when provided a valid MultiPolygon object', function () {
      assert(GeoJSON.isMultiPolygon(valid.MultiPolygon()));
    });
    it('should return false when provided a MultiPolygon object without a type', function () {
      var MultiPolygon = valid.MultiPolygon();
      delete MultiPolygon.type;
      assert(!GeoJSON.isMultiPolygon(MultiPolygon));
    });
    it('should return false when provided a MultiPolygon object without coordinates', function () {
      var MultiPolygon = valid.MultiPolygon();
      delete MultiPolygon.coordinates;
      assert(!GeoJSON.isMultiPolygon(MultiPolygon));
    });
    it('should return false when provided nothing', function () {
      assert(!GeoJSON.isMultiPolygon());
    });
  });

  describe('isGeometryCollection', function () {
    it('should return true when provided a valid GeometryCollection object', function () {
      assert(GeoJSON.isGeometryCollection(valid.GeometryCollection()));
    });
    it('should return false when provided a GeometryCollection object without a type', function () {
      var GeometryCollection = valid.GeometryCollection();
      delete GeometryCollection.type;
      assert(!GeoJSON.isGeometryCollection(GeometryCollection));
    });
    it('should return false when provided a GeometryCollection object without geometries', function () {
      var GeometryCollection = valid.GeometryCollection();
      delete GeometryCollection.geometries;
      assert(!GeoJSON.isGeometryCollection(GeometryCollection));
    });
    it('should return false when provided nothing', function () {
      assert(!GeoJSON.isGeometryCollection());
    });
  });

  describe('isFeature', function () {
    it('should return true when provided a valid Feature object', function () {
      assert(GeoJSON.isFeature(valid.Feature()));
    });
    it('should return false when provided a Feature object without a type', function () {
      var Feature = valid.Feature();
      delete Feature.type;
      assert(!GeoJSON.isFeature(Feature));
    });
    it('should return false when provided a Feature object without geometry', function () {
      var Feature = valid.Feature();
      delete Feature.geometry;
      assert(!GeoJSON.isFeature(Feature));
    });
    it('should return false when provided nothing', function () {
      assert(!GeoJSON.isFeature());
    });
  });

  describe('isFeatureCollection', function () {
    it('should return true when provided a valid FeatureCollection object', function () {
      assert(GeoJSON.isFeatureCollection(valid.FeatureCollection()));
    });
    it('should return false when provided a FeatureCollection object without a type', function () {
      var FeatureCollection = valid.FeatureCollection();
      delete FeatureCollection.type;
      assert(!GeoJSON.isFeatureCollection(FeatureCollection));
    });
    it('should return false when provided a FeatureCollection object without features', function () {
      var FeatureCollection = valid.FeatureCollection();
      delete FeatureCollection.features;
      assert(!GeoJSON.isFeatureCollection(FeatureCollection));
    });
    it('should return false when provided nothing', function () {
      assert(!GeoJSON.isFeatureCollection());
    });
  });

  describe('isCRS', function () {
    it('should return true when provided a valid CRS object', function () {
      assert(GeoJSON.isCRS(valid.CRS()));
    });
    it('should return false when provided a CRS object without a type', function () {
      var crs = valid.CRS();
      delete crs.type;
      assert(!GeoJSON.isCRS(crs));
    });
    it('should return false when provided a CRS object without properties', function () {
      var crs = valid.CRS();
      delete crs.properties;
      assert(!GeoJSON.isCRS(crs));
    });
    it('should return false when provided nothing', function () {
      assert(!GeoJSON.isCRS());
    });
  });

  describe('isLink', function () {
    it('should return true when provided a valid Link object', function () {
      assert(GeoJSON.isLink(valid.Link()));
    });
    it('should return true when provided a Link object without a type', function () {
      var Link = valid.Link();
      delete Link.type;
      assert(GeoJSON.isLink(Link));
    });
    it('should return false when provided a Link object without href', function () {
      var Link = valid.Link();
      delete Link.href;
      assert(!GeoJSON.isLink(Link));
    });
    it('should return false when provided nothing', function () {
      assert(!GeoJSON.isLink());
    });
  });

  describe('isBbox', function () {
    xit('should return true when provided a valid Bbox', function () {
      assert(GeoJSON.isBbox(valid.Bbox()));
    });
  });

  describe('Point', function () {
    it('should return a valid Point object when provided a valid Position', function () {
      assert(GeoJSON.isPoint(GeoJSON.Point(valid.Position())));
    });
  });

  describe('Feature', function () {
    it('should return a valid Feature object when provided a valid Geometry', function () {
      assert(GeoJSON.isFeature(GeoJSON.Feature(valid.Geometry(), {})));
    });
  });

  describe('FeatureCollection', function () {
    it('should return a valid FeatureCollection object when provided nothing', function () {
      assert(GeoJSON.isFeatureCollection(GeoJSON.FeatureCollection()));
    });
    it('should return a valid FeatureCollection object when provided a valid Feature', function () {
      assert(GeoJSON.isFeatureCollection(GeoJSON.FeatureCollection(valid.Feature())));
    });
  });

  describe('GeometryCollection', function () {
    it('should return a valid GeometryCollection object when provided nothing', function () {
      assert(GeoJSON.isGeometryCollection(GeoJSON.GeometryCollection()));
    });
    it('should return a valid GeometryCollection object when provided a valid Geometry', function () {
      assert(GeoJSON.isGeometryCollection(GeoJSON.GeometryCollection(valid.Geometry())));
    });
  });

//////////////////////// UTILITY TESTS \\\\\\\\\\\\\\\\\\\\\\\\
 describe('equalPositions', function () {
    it('should return true when provided two valid Positions containing the same element values', function () {
      var elementA = valid.Position();
      var elementB = JSON.parse(JSON.stringify(elementA))
      assert(GeoJSON.isPosition(elementA));
      assert(GeoJSON.isPosition(elementB));
      assert(GeoJSON.equalPositions(elementA, elementB));
    });
    it('should return false when provided two valid Positions containing the different element values', function () {
      // there may be a small change that they equal depending on how Math.random creates its numbers
      var elementA = valid.Position()
      var elementB = valid.Position()
      assert(GeoJSON.isPosition(elementA));
      assert(GeoJSON.isPosition(elementB));
      assert(!GeoJSON.equalPositions(elementA, elementB));
    });
  });

  describe('containedPolygon', function () {
    var elementA = valid.LinearRingCoordinates();
    var elementB = []
    for(var x = 0; x < elementA.length; x++) {
      position = []
      for (var i = 0; i < elementA[x].length; i++) {
        if (elementA[x][i] < 0) {
          position.push(elementA[x][i] + 1);
        } else {
          position.push(elementA[x][i] - 1);
        }
      }
      elementB.push(position)
    }
    it('should return true when first Position is inside second Position', function () {
      assert(GeoJSON.isLinearRingCoordinates(elementA));
      assert(GeoJSON.isLinearRingCoordinates(elementB));
      assert(GeoJSON.containedPolygon(elementB, elementA));
    });
    it('should return false when first Position is not inside second Position', function () {
      assert(GeoJSON.isLinearRingCoordinates(elementA));
      assert(GeoJSON.isLinearRingCoordinates(elementB));
      assert(!GeoJSON.containedPolygon(elementB, elementA));

    });
  });

});


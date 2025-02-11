#Convert GeoJSON to KML.
 以GeoJSON数据作为对象，将KML数据作为XML字符串返回。


github地址：https://github.com/mapbox/tokml
 


API  ：tokml(geojsonObject, [options])
 
 
The property to name/description mapping: while GeoJSON supports freeform properties on each feature, KML has an expectation of name and description properties that are often styled and displayed automatically. These options let you define a mapping from the GeoJSON style to KML's.

name: the name of the property in each GeoJSON Feature that contains the feature's name
description: the name of the property in each GeoJSON Feature that contains the feature's description
Timestamp: KML can associate features with a moment in time via the TimeStamp tag. GeoJSON doesn't have a comparable field, but a custom property can be mapped

timestamp: the name of the property in each GeoJSON Feature that contains a timestamp in XML Schema Time (yyyy-mm-ddThh:mm:sszzzzzz)
Document name and description: KML supports name and description properties for the full document.

documentName: the name of the full document
documentDescription: the description of the full document
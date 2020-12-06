package com.smartsupplychain.foodsupplier;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConvertedJson;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamoDBTypeConvertedJson
@DynamoDBTable(tableName = "shipementhistory")

public class ShippementPOJOHistory {

	@DynamoDBHashKey(attributeName = "orderid")
	public String orderid;

	@DynamoDBHashKey(attributeName = "cargoid")
	public String cargoid;
	
	@DynamoDBHashKey(attributeName = "cargo_moving_status")
	public String cargo_moving_status;
	
	@DynamoDBHashKey(attributeName = "timestamp")
	public Date timestamp;

	@DynamoDBAttribute(attributeName = "fuel_level")
	public String fuel_level;
	
	@DynamoDBAttribute(attributeName = "fuel_consumption")
	public String fuel_consumption;

	@DynamoDBAttribute(attributeName = "no_of_stops")
	public String no_of_stops;

	@DynamoDBAttribute(attributeName = "idling")
	public String idling;

	@DynamoDBAttribute(attributeName = "distance_covered")
	public String distance_covered;
	
	@DynamoDBAttribute(attributeName = "speeding_val")
	public float speeding_val;
	
	@DynamoDBAttribute(attributeName = "sensorsreading")
	public Map<String,String> sensorsreading;

}

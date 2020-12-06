package com.smartsupplychain.iotmanager;

import java.util.Date;
import java.util.List;

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
@DynamoDBTable(tableName = "cargomasterdata")

public class CargoMasterDataPOJO {

	@DynamoDBHashKey(attributeName = "cargoid")
	public String cargoid;
	
	@DynamoDBAttribute(attributeName = "timestamp")
	public Date timestamp;

	@DynamoDBAttribute(attributeName = "cargo_reg_id")
	public String cargo_reg_id;

	@DynamoDBAttribute(attributeName = "cargo_type")
	public String cargo_type;

	@DynamoDBAttribute(attributeName = "cargo_comapny")
	public String cargo_comapny;
	
	@DynamoDBAttribute(attributeName = "cargo_from_route")
	public String cargo_from_route;
	
	@DynamoDBAttribute(attributeName = "temperature")
	public String temperature;
	
	@DynamoDBAttribute(attributeName = "light")
	public String light;
	
	@DynamoDBAttribute(attributeName = "weight")
	public String weight;
	
	@DynamoDBAttribute(attributeName = "latitude")
	public String latitude;
	
	@DynamoDBAttribute(attributeName = "humidity")
	public String humidity;
	
	@DynamoDBAttribute(attributeName = "rfid")
	public String rfid;


}

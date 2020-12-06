package com.smartsupplychain.foodsupplier;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConvertedJson;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamoDBTypeConvertedJson
@DynamoDBTable(tableName = "cargo")
public class CargoPOJO implements Serializable {



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
	
	@DynamoDBAttribute(attributeName = "cargo_to_route")
	public String cargo_to_route;
	
	@DynamoDBAttribute(attributeName = "cargo_status")
	public String cargo_status;
	
	@DynamoDBAttribute(attributeName = "sensorlist")
	public Map<String,String> sensorlist;
	
	@DynamoDBAttribute(attributeName = "driver_name")
	public String driver_name;
	
	@DynamoDBAttribute(attributeName = "license_no")
	public String license_no;
	
	@DynamoDBAttribute(attributeName = "driver_address")
	public String driver_address;
	
	@DynamoDBAttribute(attributeName = "driver_rating")
	public String driver_rating;
	
	@DynamoDBAttribute(attributeName = "driver_phonenumber")
	public String driver_phonenumber;
	


}

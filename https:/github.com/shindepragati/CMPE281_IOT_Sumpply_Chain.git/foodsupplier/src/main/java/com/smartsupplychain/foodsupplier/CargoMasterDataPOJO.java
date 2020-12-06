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
@DynamoDBTable(tableName = "customershipment")

public class CargoMasterDataPOJO {

	@DynamoDBHashKey(attributeName = "cargoid")
	public String cargoid;
	
	@DynamoDBAttribute(attributeName = "orderid")
	public String orderid;
	
	@DynamoDBAttribute(attributeName = "order_creation_date")
	public Date order_creation_date;

	@DynamoDBAttribute(attributeName = "order_completion_date")
	public Date order_completion_date;

	
	@DynamoDBAttribute(attributeName = "cargo_reg_id")
	public String cargo_reg_id;

	@DynamoDBAttribute(attributeName = "cargo_type")
	public String cargo_type;

	@DynamoDBAttribute(attributeName = "cargo_comapny")
	public String cargo_comapny;
	
	@DynamoDBAttribute(attributeName = "shipement_from_route")
	public String shipement_from_route;
	
	@DynamoDBAttribute(attributeName = "shipement_to_route")
	public String shipement_to_route;
	
	@DynamoDBAttribute(attributeName = "shipement_status")
	public String shipement_status;
	
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
		
	@DynamoDBAttribute(attributeName = "packages")
	public String packages;
	
	@DynamoDBAttribute(attributeName = "customeremail")
	public String customeremail;
	
	@DynamoDBAttribute(attributeName = "customername")
	public String customername;

	@DynamoDBAttribute(attributeName = "customeraddress")
	public String customeraddress;
	
	@DynamoDBAttribute(attributeName = "customerphonenumber")
	public String customerphonenumber;
	



}

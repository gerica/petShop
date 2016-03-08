package br.com.excecao;

import javax.xml.bind.annotation.XmlRootElement;

public class ErrorItem {

    private Integer errorCode;
    private String name;
    private String description;
    
    ErrorItem() {}

    public ErrorItem(Integer errorCode, String name, String description) {
        this.errorCode = errorCode;
        this.name = name;
        this.description = description;
    }

	public Integer getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(Integer errorCode) {
		this.errorCode = errorCode;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
        
        //getters and setters omitted
}
package br.com.entidade.permissao;

import java.io.Serializable;

public class Privilege implements Serializable {

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	private String name;

	@Override
	public String toString() {
		return "Privilege [name=" + name + "]";
	}
}

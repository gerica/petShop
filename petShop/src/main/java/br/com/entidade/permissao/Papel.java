package br.com.entidade.permissao;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * The persistent class for the tb_papel database table.
 * 
 */
@Entity
@Table(name = "tb_papel")
public class Papel implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_papel")
	private Integer idPapel;

	@Column(name = "ds_papel")
	private String dsPapel;

	public Papel() {
	}

	public Integer getIdPapel() {
		return this.idPapel;
	}

	public void setIdPapel(Integer idPapel) {
		this.idPapel = idPapel;
	}

	public String getDsPapel() {
		return this.dsPapel;
	}

	public void setDsPapel(String dsPapel) {
		this.dsPapel = dsPapel;
	}

}
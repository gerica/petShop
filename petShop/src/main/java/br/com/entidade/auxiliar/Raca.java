package br.com.entidade.auxiliar;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * The persistent class for the tb_raca database table.
 * 
 */
@Entity
@Table(name = "tb_raca")
public class Raca implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_raca")
	private Integer idRaca;

	@Column(name = "ds_nome")
	private String dsNome;

	// bi-directional many-to-one association to TipoPet
	@ManyToOne
	@JoinColumn(name = "id_tipo_pet")
	private TipoPet tipoPet;

	public Raca() {
	}

	public Integer getIdRaca() {
		return this.idRaca;
	}

	public void setIdRaca(Integer idRaca) {
		this.idRaca = idRaca;
	}

	public String getDsNome() {
		return this.dsNome;
	}

	public void setDsNome(String dsNome) {
		this.dsNome = dsNome;
	}

	public TipoPet getTipoPet() {
		return tipoPet;
	}

	public void setTipoPet(TipoPet tipoPet) {
		this.tipoPet = tipoPet;
	}

}
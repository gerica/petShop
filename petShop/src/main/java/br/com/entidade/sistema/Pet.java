package br.com.entidade.sistema;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import br.com.entidade.auxiliar.Raca;
import br.com.entidade.auxiliar.TipoPet;

/**
 * The persistent class for the tb_pet database table.
 * 
 */
@Entity
@Table(name = "tb_pet")
@NamedQuery(name = "Pet.findAll", query = "SELECT p FROM Pet p")
public class Pet implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@Column(name = "ds_nome")
	private String dsNome;

	@Temporal(TemporalType.DATE)
	@Column(name = "dt_nacimento")
	private Date dtNacimento;

	// bi-directional many-to-one association to Raca
	@ManyToOne
	@JoinColumn(name = "id_raca")
	private Raca tbRaca;

	// bi-directional many-to-one association to TipoPet
	@ManyToOne
	@JoinColumn(name = "id_tipo_pet")
	private TipoPet tbTipoPet;

	// bi-directional many-to-one association to Cliente
	@ManyToOne
	@JoinColumn(name = "id_cliente")
	private Cliente cliente;

	public Pet() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getDsNome() {
		return this.dsNome;
	}

	public void setDsNome(String dsNome) {
		this.dsNome = dsNome;
	}

	public Date getDtNacimento() {
		return this.dtNacimento;
	}

	public void setDtNacimento(Date dtNacimento) {
		this.dtNacimento = dtNacimento;
	}

	public Raca getTbRaca() {
		return this.tbRaca;
	}

	public void setTbRaca(Raca tbRaca) {
		this.tbRaca = tbRaca;
	}

	public TipoPet getTbTipoPet() {
		return this.tbTipoPet;
	}

	public void setTbTipoPet(TipoPet tbTipoPet) {
		this.tbTipoPet = tbTipoPet;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

}
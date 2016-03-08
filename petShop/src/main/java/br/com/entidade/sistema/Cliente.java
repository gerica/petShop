package br.com.entidade.sistema;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * The persistent class for the tb_cliente database table.
 * 
 */
@Entity
@Table(name = "tb_cliente")
public class Cliente implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_cliente")
	private Integer idCliente;

	@Column(name = "ds_email")
	private String dsEmail;

	@Column(name = "ds_nome")
	private String dsNome;

	@Column(name = "ds_sobre_nome")
	private String dsSobreNome;

	@Column(name = "dt_nacimento")
	private Date dtNacimento;

	// bi-directional many-to-one association to Pet
	@OneToMany(mappedBy = "cliente")
	private List<Pet> pets;

	public Cliente() {
	}

	public Integer getIdCliente() {
		return this.idCliente;
	}

	public void setIdCliente(Integer idCliente) {
		this.idCliente = idCliente;
	}

	public String getDsEmail() {
		return this.dsEmail;
	}

	public void setDsEmail(String dsEmail) {
		this.dsEmail = dsEmail;
	}

	public String getDsNome() {
		return this.dsNome;
	}

	public void setDsNome(String dsNome) {
		this.dsNome = dsNome;
	}

	public String getDsSobreNome() {
		return this.dsSobreNome;
	}

	public void setDsSobreNome(String dsSobreNome) {
		this.dsSobreNome = dsSobreNome;
	}

	public Pet addTbPet(Pet tbPet) {
		getPets().add(tbPet);
		return tbPet;
	}

	public Pet removeTbPet(Pet tbPet) {
		getPets().remove(tbPet);
		return tbPet;
	}

	public List<Pet> getPets() {
		return pets;
	}

	public void setPets(List<Pet> pets) {
		this.pets = pets;
	}

	public Date getDtNacimento() {
		return dtNacimento;
	}

	public void setDtNacimento(Date dtNacimento) {
		this.dtNacimento = dtNacimento;
	}

}
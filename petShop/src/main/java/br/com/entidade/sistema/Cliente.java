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
import javax.persistence.Table;

import br.com.entidade.permissao.Usuario;

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
	// @OneToMany(mappedBy = "cliente")
	// @JsonManagedReference("cliente")
	// private List<Pet> pets;

	@ManyToOne
	@JoinColumn(name = "id_usuario")
	private Usuario usuario;

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

	public Date getDtNacimento() {
		return dtNacimento;
	}

	public void setDtNacimento(Date dtNacimento) {
		this.dtNacimento = dtNacimento;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

}
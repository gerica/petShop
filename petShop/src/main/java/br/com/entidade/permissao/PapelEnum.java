package br.com.entidade.permissao;

public enum PapelEnum {

	GERENTE(1, "GERENTE"), //
	VENDAS(2, "VENDAS"), //
	COMPRAS(3, "COMPRAS"), //
	VETERINARIO(4, "VETERINARIO"), //
	CONTABIL(5, "CONTABIL"), //
	FISCAL(6, "FISCAL"), //
	TOSARDOR(7, "TOSARDOR"), //
	ENCARREGADO_ESTOQUE(8, "ENCARREGADO ESTOQUE");

	private Integer id;
	private String descricao;

	private PapelEnum(Integer id, String descricao) {
		this.id = id;
		this.descricao = descricao;
	}

}

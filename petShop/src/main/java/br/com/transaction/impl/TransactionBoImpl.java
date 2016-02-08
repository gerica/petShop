package br.com.transaction.impl;

import org.springframework.stereotype.Service;

import br.com.transaction.TransactionBo;

@Service
public class TransactionBoImpl implements TransactionBo {

	public String save() {

		return "Jersey + Spring example";

	}

}
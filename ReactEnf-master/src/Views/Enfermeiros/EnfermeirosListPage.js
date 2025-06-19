import React, { useState, useEffect } from "react";
import enfermeiroService from "../../Services/enfermeiroService";
import hospitalService from "../../Services/hospitalService";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

function EnfermeirosListPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hospitais, setHospitais] = useState([]);

  const [modalEditar, setModalEditar] = useState(false);
  const [modalIncluir, setModalIncluir] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);

  const [enfermeiroSelecionado, setEnfermeiroSelecionado] = useState({
    id: 0,
    nome: "",
    email: "",
    endereco: "",
    especialidade: "",
    idade: "",
    hospitalId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEnfermeiroSelecionado({
      ...enfermeiroSelecionado,
      [name]: value,
    });
  };

  const abrirFecharModalIncluir = () => {
    setModalIncluir(!modalIncluir);
    if (!modalIncluir) {
      setEnfermeiroSelecionado({
        id: 0,
        nome: "",
        email: "",
        endereco: "",
        especialidade: "",
        idade: "",
        hospitalId: "",
      });
    }
  };

  const abrirFecharModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirFecharModalExcluir = () => {
    setModalExcluir(!modalExcluir);
  };

  const pedidoGet = async () => {
    setLoading(true);
    setError(null);
    try {
      const responseData = await enfermeiroService.getAllEnfermeiros();
      setData(responseData);
    } catch (err) {
      console.error("Erro ao buscar enfermeiros:", err);
      setError("Erro ao carregar enfermeiros. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const pedidoPost = async () => {
    setLoading(true);
    setError(null);
    try {
      const enfermeiroParaCriar = {
        ...enfermeiroSelecionado,
        idade: parseInt(enfermeiroSelecionado.idade, 10),
        hospitalId: enfermeiroSelecionado.hospitalId
          ? parseInt(enfermeiroSelecionado.hospitalId, 10)
          : null,
      };
      if (enfermeiroParaCriar.id === 0) {
        delete enfermeiroParaCriar.id;
      }

      const newEnfermeiro = await enfermeiroService.createEnfermeiro(
        enfermeiroParaCriar
      );
      setData((prevData) => prevData.concat(newEnfermeiro));
      abrirFecharModalIncluir();
    } catch (err) {
      console.error(
        "Erro ao criar enfermeiro:",
        err.response ? err.response.data : err.message
      );
      setError("Erro ao criar enfermeiro. Verifique os dados e o HospitalId.");
    } finally {
      setLoading(false);
    }
  };

  const enfermeiroPut = async () => {
    setLoading(true);
    setError(null);
    try {
      const enfermeiroParaAtualizar = {
        ...enfermeiroSelecionado,
        idade: parseInt(enfermeiroSelecionado.idade, 10),
        hospitalId: enfermeiroSelecionado.hospitalId
          ? parseInt(enfermeiroSelecionado.hospitalId, 10)
          : null,
      };

      await enfermeiroService.updateEnfermeiro(
        enfermeiroParaAtualizar.id,
        enfermeiroParaAtualizar
      );
      setData((prevData) =>
        prevData.map((enfermeiro) =>
          enfermeiro.id === enfermeiroParaAtualizar.id
            ? {
                ...enfermeiroParaAtualizar,
                hospital: hospitais.find(
                  (h) => h.id === enfermeiroParaAtualizar.hospitalId
                ),
              }
            : enfermeiro
        )
      );
      abrirFecharModalEditar();
    } catch (err) {
      console.error(
        "Erro ao atualizar enfermeiro:",
        err.response ? err.response.data : err.message
      );
      setError("Erro ao atualizar enfermeiro. Verifique os dados.");
    } finally {
      setLoading(false);
    }
  };

  const enfermeiroDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      const success = await enfermeiroService.deleteEnfermeiro(
        enfermeiroSelecionado.id
      );
      if (success) {
        setData((prevData) =>
          prevData.filter(
            (enfermeiro) => enfermeiro.id !== enfermeiroSelecionado.id
          )
        );
        abrirFecharModalExcluir();
      } else {
        setError(
          "Não foi possível excluir o enfermeiro. Ele pode não existir ou há um erro no servidor."
        );
      }
    } catch (err) {
      console.error(
        "Erro ao deletar enfermeiro:",
        err.response ? err.response.data : err.message
      );
      setError("Erro ao deletar enfermeiro.");
    } finally {
      setLoading(false);
    }
  };

  const selecionarEnfermeiro = (enfermeiro, caso) => {
    setEnfermeiroSelecionado(enfermeiro);
    caso === "Editar" ? abrirFecharModalEditar() : abrirFecharModalExcluir();
  };

  useEffect(() => {
    pedidoGet();
    const fetchHospitais = async () => {
      try {
        const hospitaisData = await hospitalService.getAllHospitais();
        setHospitais(hospitaisData);
      } catch (err) {
        console.error("Erro ao carregar hospitais para o dropdown:", err);
      }
    };
    fetchHospitais();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Carregando...</span>
        </div>
        <p className="ms-2">Carregando enfermeiros...</p>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger m-3 text-center">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center">Cadastro de Enfermeiros</h3>
      <div className="d-flex justify-content-end mb-3">
        <button
          onClick={() => abrirFecharModalIncluir()}
          className="btn btn-success"
        >
          Incluir Novo Enfermeiro
        </button>
      </div>
      {data.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          Nenhum enfermeiro cadastrado ainda.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Endereço</th>
                <th>Especialidade</th>
                <th>Idade</th>
                <th>Hospital</th>
                <th>Operação</th>
              </tr>
            </thead>
            <tbody>
              {data.map((enfermeiro) => (
                <tr key={enfermeiro.id}>
                  <td>{enfermeiro.id}</td>
                  <td>{enfermeiro.nome}</td>
                  <td>{enfermeiro.email}</td>
                  <td>{enfermeiro.endereco}</td>
                  <td>{enfermeiro.especialidade}</td>
                  <td>{enfermeiro.idade}</td>
                  <td>
                    {enfermeiro.hospital ? enfermeiro.hospital.nome : "N/A"}
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => selecionarEnfermeiro(enfermeiro, "Editar")}
                    >
                      Editar
                    </button>{" "}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        selecionarEnfermeiro(enfermeiro, "Excluir")
                      }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={modalIncluir}>
        <ModalHeader>Incluir Enfermeiro</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nome: </label>
            <input
              type="text"
              className="form-control"
              name="nome"
              onChange={handleChange}
              value={enfermeiroSelecionado.nome || ""}
            />
            <label className="mt-3">Email: </label>
            <input
              type="text"
              className="form-control"
              name="email"
              onChange={handleChange}
              value={enfermeiroSelecionado.email || ""}
            />
            <label className="mt-3">Endereço: </label>
            <input
              type="text"
              className="form-control"
              name="endereco"
              onChange={handleChange}
              value={enfermeiroSelecionado.endereco || ""}
            />
            <label className="mt-3">Especialidade: </label>
            <input
              type="text"
              className="form-control"
              name="especialidade"
              onChange={handleChange}
              value={enfermeiroSelecionado.especialidade || ""}
            />
            <label className="mt-3">Idade: </label>
            <input
              type="number"
              className="form-control"
              name="idade"
              onChange={handleChange}
              value={enfermeiroSelecionado.idade || ""}
            />
            <label className="mt-3">Hospital: </label>
            <select
              className="form-control"
              name="hospitalId"
              onChange={handleChange}
              value={enfermeiroSelecionado.hospitalId || ""}
            >
              <option value="">Selecione um Hospital</option>
              {hospitais.map((hospital) => (
                <option key={hospital.id} value={hospital.id}>
                  {hospital.nome}
                </option>
              ))}
            </select>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => pedidoPost()}>
            Incluir
          </button>{" "}
          <button
            className="btn btn-danger"
            onClick={() => abrirFecharModalIncluir()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Enfermeiro</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID: </label>
            <input
              type="text"
              className="form-control"
              readOnly
              value={enfermeiroSelecionado.id || ""}
            />
            <label className="mt-3">Nome: </label>
            <input
              type="text"
              className="form-control"
              name="nome"
              onChange={handleChange}
              value={enfermeiroSelecionado.nome || ""}
            />
            <label className="mt-3">Email: </label>
            <input
              type="text"
              className="form-control"
              name="email"
              onChange={handleChange}
              value={enfermeiroSelecionado.email || ""}
            />
            <label className="mt-3">Endereço: </label>
            <input
              type="text"
              className="form-control"
              name="endereco"
              onChange={handleChange}
              value={enfermeiroSelecionado.endereco || ""}
            />
            <label className="mt-3">Especialidade: </label>
            <input
              type="text"
              className="form-control"
              name="especialidade"
              onChange={handleChange}
              value={enfermeiroSelecionado.especialidade || ""}
            />
            <label className="mt-3">Idade: </label>
            <input
              type="number"
              className="form-control"
              name="idade"
              onChange={handleChange}
              value={enfermeiroSelecionado.idade || ""}
            />

            <label className="mt-3">Hospital: </label>
            <select
              className="form-control"
              name="hospitalId"
              onChange={handleChange}
              value={enfermeiroSelecionado.hospitalId || ""}
            >
              <option value="">Selecione um Hospital</option>
              {hospitais.map((hospital) => (
                <option key={hospital.id} value={hospital.id}>
                  {hospital.nome}
                </option>
              ))}
            </select>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => enfermeiroPut()}>
            Editar
          </button>{" "}
          <button
            className="btn btn-danger"
            onClick={() => abrirFecharModalEditar()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalExcluir}>
        <ModalBody>
          Confirma a exclusão deste(a) enfermeiro(a) :{" "}
          <strong>{enfermeiroSelecionado.nome || ""}</strong> ?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => enfermeiroDelete()}>
            Sim
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => abrirFecharModalExcluir()}
          >
            Não
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default EnfermeirosListPage;

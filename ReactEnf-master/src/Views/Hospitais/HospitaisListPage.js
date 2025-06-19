import React, { useState, useEffect } from "react";
import hospitalService from "../../Services/hospitalService";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

function HospitaisListPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [modalEditar, setModalEditar] = useState(false);
  const [modalIncluir, setModalIncluir] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);

  const [hospitalSelecionado, setHospitalSelecionado] = useState({
    id: 0,
    nome: "",
    endereco: "",
    telefone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHospitalSelecionado({
      ...hospitalSelecionado,
      [name]: value,
    });
  };

  const abrirFecharModalIncluir = () => {
    setModalIncluir(!modalIncluir);
    if (!modalIncluir) {
      setHospitalSelecionado({
        id: 0,
        nome: "",
        endereco: "",
        telefone: "",
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
      const responseData = await hospitalService.getAllHospitais();
      setData(responseData);
    } catch (err) {
      console.error("Erro ao buscar hospitais:", err);
      setError("Erro ao carregar hospitais. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const pedidoPost = async () => {
    setLoading(true);
    setError(null);
    try {
      const hospitalParaCriar = { ...hospitalSelecionado };
      if (hospitalParaCriar.id === 0) {
        delete hospitalParaCriar.id;
      }

      const newHospital = await hospitalService.createHospital(
        hospitalParaCriar
      );
      setData((prevData) => prevData.concat(newHospital));
      abrirFecharModalIncluir();
    } catch (err) {
      console.error(
        "Erro ao criar hospital:",
        err.response ? err.response.data : err.message
      );
      setError("Erro ao criar hospital. Verifique os dados.");
    } finally {
      setLoading(false);
    }
  };

  const hospitalPut = async () => {
    setLoading(true);
    setError(null);
    try {
      const hospitalParaAtualizar = { ...hospitalSelecionado };

      await hospitalService.updateHospital(
        hospitalParaAtualizar.id,
        hospitalParaAtualizar
      );
      setData((prevData) =>
        prevData.map((hospital) =>
          hospital.id === hospitalParaAtualizar.id
            ? hospitalParaAtualizar
            : hospital
        )
      );
      abrirFecharModalEditar();
    } catch (err) {
      console.error(
        "Erro ao atualizar hospital:",
        err.response ? err.response.data : err.message
      );
      setError("Erro ao atualizar hospital. Verifique os dados.");
    } finally {
      setLoading(false);
    }
  };

  const hospitalDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      const success = await hospitalService.deleteHospital(
        hospitalSelecionado.id
      );
      if (success) {
        setData((prevData) =>
          prevData.filter((hospital) => hospital.id !== hospitalSelecionado.id)
        );
        abrirFecharModalExcluir();
      } else {
        setError(
          "Não foi possível excluir o hospital. Ele pode não existir ou há um erro no servidor."
        );
      }
    } catch (err) {
      console.error(
        "Erro ao deletar hospital:",
        err.response ? err.response.data : err.message
      );
      setError("Erro ao deletar hospital.");
    } finally {
      setLoading(false);
    }
  };

  const selecionarHospital = (hospital, caso) => {
    setHospitalSelecionado(hospital);
    caso === "Editar" ? abrirFecharModalEditar() : abrirFecharModalExcluir();
  };

  useEffect(() => {
    pedidoGet();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Carregando...</span>
        </div>
        <p className="ms-2">Carregando hospitais...</p>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger m-3 text-center">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center">Cadastro de Hospitais</h3>

      <div className="d-flex justify-content-end mb-3">
        <button
          onClick={() => abrirFecharModalIncluir()}
          className="btn btn-success"
        >
          Incluir Novo Hospital
        </button>
      </div>

      {data.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          Nenhum hospital cadastrado ainda.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Endereço</th>
                <th>Telefone</th>
                <th>Operação</th>
              </tr>
            </thead>
            <tbody>
              {data.map((hospital) => (
                <tr key={hospital.id}>
                  <td>{hospital.id}</td>
                  <td>{hospital.nome}</td>
                  <td>{hospital.endereco}</td>
                  <td>{hospital.telefone}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => selecionarHospital(hospital, "Editar")}
                    >
                      Editar
                    </button>{" "}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => selecionarHospital(hospital, "Excluir")}
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
        <ModalHeader>Incluir Hospital</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nome: </label>
            <input
              type="text"
              className="form-control"
              name="nome"
              onChange={handleChange}
              value={hospitalSelecionado.nome || ""}
            />
            <label className="mt-3">Endereço: </label>
            <input
              type="text"
              className="form-control"
              name="endereco"
              onChange={handleChange}
              value={hospitalSelecionado.endereco || ""}
            />
            <label className="mt-3">Telefone: </label>
            <input
              type="text"
              className="form-control"
              name="telefone"
              onChange={handleChange}
              value={hospitalSelecionado.telefone || ""}
            />
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
        <ModalHeader>Editar Hospital</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID: </label>
            <input
              type="text"
              className="form-control"
              readOnly
              value={hospitalSelecionado.id || ""}
            />
            <label className="mt-3">Nome: </label>
            <input
              type="text"
              className="form-control"
              name="nome"
              onChange={handleChange}
              value={hospitalSelecionado.nome || ""}
            />
            <label className="mt-3">Endereço: </label>
            <input
              type="text"
              className="form-control"
              name="endereco"
              onChange={handleChange}
              value={hospitalSelecionado.endereco || ""}
            />
            <label className="mt-3">Telefone: </label>
            <input
              type="text"
              className="form-control"
              name="telefone"
              onChange={handleChange}
              value={hospitalSelecionado.telefone || ""}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => hospitalPut()}>
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
          Confirma a exclusão deste(a) hospital :{" "}
          <strong>{hospitalSelecionado.nome || ""}</strong> ?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => hospitalDelete()}>
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

export default HospitaisListPage;

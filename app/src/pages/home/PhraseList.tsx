import "./style.css"
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { Phrase } from "../../models/Phrase"

interface Props {
  phraseList: Phrase[]
  phrase: string
  setPhrase: (value: string) => void
  deletePhrase: (id: number, phrase: string) => void
  addPhrase: () => void
}

function PhraseList(props: Props) {

  return (
    <div className="col-md-12" style={{ margin: "50px 0" }}>
      <div className="card px-3">
        <div className="card-body">
          <h4 className="card-title">Suas frases</h4>
          <div className="add-items d-flex">
            <input type="text" className="form-control todo-list-input" placeholder="Qual a frase de hoje?"
              onChange={event => props.setPhrase(event.target.value)} value={props.phrase}
            />
            <button className="add btn btn-primary font-weight-bold todo-list-add-btn"
              onClick={_ => props.addPhrase()}>Adicionar</button>
          </div>
          <div className="list-wrapper">
            <ul className="d-flex flex-column-reverse todo-list">
              {
                props.phraseList.sort((a, b) => a.createdAt - b.createdAt).map(({ phrase, id }) => {
                  return (
                    <li>
                      <div className="form-check" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                        <label className="form-check-label">
                          {phrase}
                        </label>
                        <div className="button-delete-phrase" onClick={_ => props.deletePhrase(id, phrase)}>
                          <FontAwesomeIcon icon={faTrashCan} color="white" />
                        </div>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    </div>

  );
}

export default PhraseList;

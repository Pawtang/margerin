import { React, Fragment } from "react";
import { Link } from "react-router-dom";
import AppNav from "./AppNav";

const ProductHasMaterials = () => {
  return (
    // <div className="container  ">
    <Fragment>
      <div className="row shadow-sm">
        <div className="row row-cols-5 ">
          <div className="col">
            <h6 className="text-center">Material</h6>
          </div>
          <div className="col">
            <h6 className="text-center">Quantity</h6>
          </div>
          <div className="col">
            <h6 className="text-center">Unit</h6>
          </div>
          <div className="col">
            <h6 className="text-center">Cost</h6>
          </div>
          <div className="col">
            <h6 className="text-center">Edit</h6>
          </div>
        </div>

        <div className="row row-cols-5 border-bottom my-2">
          <div className="col">
            <p className="text-center">Mango</p>
          </div>
          <div className="col">
            <p className="text-center">16</p>
          </div>
          <div className="col">
            <p className="text-center">each</p>
          </div>
          <div className="col text-center">
            <button className="btn btn-outline-primary">
              $7.99{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                />
              </svg>
            </button>
          </div>
          <div className="col text-center">
            <div className="btn-group" role="group" aria-label="update delete">
              <button className="btn btn-outline-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>
              </button>
              <button className="btn btn-outline-danger">
                <i class="bi bi-trash-fill"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="row row-cols-5 border-bottom my-2">
          <div className="col">
            <p className="text-center">Habanero</p>
          </div>
          <div className="col">
            <p className="text-center">8</p>
          </div>
          <div className="col">
            <p className="text-center">lbs</p>
          </div>
          <div className="col text-center">
            <button className="btn btn-outline-primary">
              $4.99{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                />
              </svg>
            </button>
          </div>
          <div className="col text-center">
            <div className="btn-group" role="group" aria-label="update delete">
              <button className="btn btn-outline-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>
              </button>
              <button className="btn btn-outline-danger">
                <i class="bi bi-trash-fill"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="row my-2">
          <div className="d-grid gap-2 col-6 mx-auto">
            <button className="btn btn-outline-primary">Add Material</button>
          </div>
          <div className="col col-10"></div>
        </div>
      </div>
    </Fragment>
    // </div>

    // <div className="row">
    //   <table class="table table-hover">
    //     <thead>
    //       <tr>
    //         <th scope="col" colspan="2">
    //           Material
    //         </th>
    //         <th scope="col">Quantity</th>
    //         <th scope="col">Unit</th>
    //         <th scope="col"></th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       <tr>
    //         <td>Mango</td>
    //         <td>16</td>
    //         <td>Each</td>
    //         <td>
    //           <button className="btn btn-primary mx-2">Transactions</button>
    //           <div
    //             className="btn-group"
    //             role="group"
    //             aria-label="update delete"
    //           >
    //             <button className="btn btn-outline-primary">
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 width="16"
    //                 height="16"
    //                 fill="currentColor"
    //                 class="bi bi-pencil-square"
    //                 viewBox="0 0 16 16"
    //               >
    //                 <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
    //                 <path
    //                   fill-rule="evenodd"
    //                   d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
    //                 />
    //               </svg>
    //             </button>
    //             <button className="btn btn-outline-danger">
    //               <i class="bi bi-trash-fill"></i>
    //             </button>
    //           </div>
    //         </td>
    //       </tr>
    //     </tbody>
    //   </table>
    // </div>
  );
};

export default ProductHasMaterials;

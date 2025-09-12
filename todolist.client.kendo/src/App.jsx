import React,{Component, useState, useRef } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { Button } from '@progress/kendo-react-buttons';
import { Checkbox } from '@progress/kendo-react-inputs';
import { Calendar } from '@progress/kendo-react-dateinputs';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { process } from '@progress/kendo-data-query';
import { Window } from '@progress/kendo-react-dialogs';
import products from './products.json';
import categories from './categories.json';
function App() {
    const [count, setCount] = useState(0);
    const [category, setCategory] = useState(null);
    const [dataState, setDataState] = useState({
        sort: [{field:'ProductName', dir:'asc'}],
        skip: 0,
        take: 10
    });
    const [windowVisible, setWindowVisible] = useState(false);
    const [gridClickedRow, setGridClickedRow] = useState({});

    const handleDropDownChange = React.useCallback(
        (event) => {
            let newDataState = { ...dataState };
            if (event.target.value.CategoryID !== null) {
                newDataState.filter = {
                    logic: 'and',
                    filters: [
                        {
                            field: 'CategoryID',
                            operator: 'eq',
                            value: event.target.value.CategoryID,
                        },
                    ],
                };
                newDataState.skip = 0;
            } else {
                newDataState.filter = [];
                newDataState.skip = 0;
            }

            setCategory(event.target.value.CategoryID);
            setDataState(newDataState);
        },
        [dataState]
    );
    const handleGridDataStateChange = (event) => {
        setDataState(event.dataState);
    };
    const handleGridRowClick = (event) => {
        setWindowVisible(true);
        setGridClickedRow(event.dataItem);
    };
    const closeWindow = React.useCallback((event) => {
        setWindowVisible(false);
    }, []);


  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
          <div className="card">
              <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
              <p>
                  <DropDownList
                      data={categories}
                      dataItemKey="CategoryID"
                      textField="CategoryName"
                      defautItem={{CategoryID:null,CategoryName:'Product categories'}}
                      onChange={handleDropDownChange} />
                  &nbsp;Selected category ID: <strong>{category}</strong>
            </p>
          </div>
          <div className="App">
            <Calendar />
          </div>
          <Grid
              data={process(products, dataState)}
              pageable={true}
              sortable={true}
              {...dataState}
              onDataStateChange={handleGridDataStateChange}
              onRowClick={handleGridRowClick}
              style={{ height: '400px' }}
          >
              <GridColumn field="ProductName" title="Product Name" />
              <GridColumn field="UnitPrice" title="Price" format="{0:c}" />
              <GridColumn field="UnitsInStock" title="Units In Stock" />
              <GridColumn field="Discontinued"/>
          </Grid>
          {
              windowVisible && (
                  <Window title="Product Details" onClose={closeWindow} height={250}>
                      <dl style={{ textAlign: 'left' }}>
                          <dt>Product Name</dt>
                          <dd>{gridClickedRow.ProductName}</dd>
                          <dt>Product ID</dt>
                          <dd>{gridClickedRow.ProductID}</dd>
                          <dt>Quantity per Unit</dt>
                          <dd>{gridClickedRow.QuantityPerUnit}</dd>
                      </dl>
                  </Window>
              )
          }
    </>
  )
}

export default App

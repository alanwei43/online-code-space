import React from "react";
import { ContainerInformation } from "../../library";
/** 
 *  
 * @date 2022-05-15 
 */
export default class ContainerList extends React.Component<ContainerListProps, ContainerListState> {
  constructor(props: ContainerListProps) {
    super(props);
    this.state = {
      // 初始化状态
      containers: []
    };
  }
  componentDidMount() {
    this.refreshList();
  }

  refreshList() {
    fetch("/api/listContainers", { method: "GET" })
      .then(res => res.json())
      .then((res: { success: boolean, result: Array<ContainerInformation> }) => {
        this.setState({
          containers: res.result || []
        });
      });
  }

  render() {
    const { containers } = this.state;

    return (<div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/">首页</a></li>
          <li className="breadcrumb-item active" aria-current="page">应用列表</li>
        </ol>
      </nav>


      <h3>容器列表</h3>
      <div className="row">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>名称</th>
              <th>状态</th>
              <th>IP</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {containers.map(c => (
              <tr key={c.id}>
                <td>{c.id.substring(0, 8)}</td>
                <td>{c.name}</td>
                <td>{c.state}</td>
                <td>{c.ip}</td>
                <td>
                  <button className="btn btn-primary btn-sm" onClick={() => this.actionStart(c)}>启动</button> &nbsp;
                  <button className="btn btn-warning btn-sm">停止</button> &nbsp;
                  {c.ports.map(port => (
                    <>
                      <a href={`/_app/${c.id}/${port.privatePort}/?__container-id=${c.id}`} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">访问 {port.privatePort}</a> &nbsp;
                    </>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>);
  }

  async actionStart(container: ContainerInformation) {
    const response = await fetch(`/api/bootContainer?id=${container.id}`, {
      method: "GET"
    });
    const data = await response.json();
    console.log(response);
    this.refreshList();
  }
}
export type ContainerListProps = {}
export type ContainerListState = {
  containers: Array<ContainerInformation>
}
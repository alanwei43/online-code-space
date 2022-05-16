import React from "react";
import type { ContainerInformation, Protocol } from "../../library";
import { fetchJson } from "../../services/utils/fetchJson";

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

  async refreshList() {
    const res = await fetchJson<Protocol<Array<ContainerInformation>>>(
      "GET",
      "/api/listContainers",
      { refresh: "true" });
    this.setState({
      containers: res.result || []
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
              <th>管理容器</th>
              <th>域名操作</th>
              <th>端口访问</th>
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
                  <button className="btn btn-warning btn-sm" onClick={() => this.actionStop(c)}>停止</button> &nbsp;
                  <button className="btn btn-warning btn-sm" onClick={() => this.actionDelete(c)}>删除</button>
                </td>
                <td>
                  <button className="btn btn-warning btn-sm" onClick={() => this.bindDomain(c)}>绑定域名</button> &nbsp;
                  <button className="btn btn-warning btn-sm" onClick={() => this.deleteDomain(c)}>删除域名</button> &nbsp;
                  <a className="btn btn-warning btn-sm"
                    title="域名绑定的是80端口(需要手动点击绑定域名)"
                    href={`http://${c.domain}.app.alanwei.com`}
                    target="_blank"
                    rel="noreferrer">域名访问</a>
                </td>
                <td>
                  {c.ports.map(port => (
                    <>
                      <a href={`/_app/${c.id}/${port.privatePort}/?__container-id=${c.id}`} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">访问 {port.privatePort}</a> &nbsp;
                    </>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
          <tbody>
            <tr>
              <td colSpan={7}>
                域名绑定的是80端口. Visual Studio Code 编辑器访问 8080 端口, IDEA 编辑器访问 8887 端口.
              </td>
            </tr>
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
    console.log(data);
    this.refreshList();
  }
  async actionDelete(container: ContainerInformation) {
    const response = await fetch(`/api/rmContainer?id=${container.id}`, {
      method: "GET"
    });
    const data = await response.json();
    console.log(data);
    this.refreshList();
  }
  async actionStop(container: ContainerInformation) {
    const response = await fetch(`/api/shutdownContainer?id=${container.id}`, {
      method: "GET"
    });
    const data = await response.json();
    console.log(data);
    this.refreshList();
  }
  async bindDomain(container: ContainerInformation) {
    const data = await fetchJson(
      "POST",
      `/api/bindDomain`, {}, {
      subdomain: container.name,
      host: container.ip,
      port: 80
    });
    alert(JSON.stringify(data));
    this.refreshList();
  }
  async deleteDomain(container: ContainerInformation) {
    // 删除域名绑定
    const response = await fetchJson<string>("GET", `/api/deleteDomain`, { domain: container.domain + "" });
    alert(JSON.stringify(response));
  }
}
export type ContainerListProps = {}
export type ContainerListState = {
  containers: Array<ContainerInformation>
}
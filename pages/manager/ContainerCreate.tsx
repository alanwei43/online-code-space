import React from "react";
import { GetContainerRuntimesItem } from "../../library";

/** 
 *  
 * @date 2022-05-15 
 */
export default class CreateContainer extends React.Component<CreateContainerProps, CreateContainerState> {
  constructor(props: CreateContainerProps) {
    super(props);
    this.state = {
      // 初始化状态
      runtimes: [],
      form: {
        name: "",
        runtime: "ideac",
        git: "",
        allowGit: true
      }
    };
  }
  componentDidMount() {
    this.initRunTimes();
  }

  async initRunTimes() {
    const response = await fetch("/api/getRuntimes", { method: "GET" })
    const data: { result: Array<GetContainerRuntimesItem> } = await response.json();
    this.setState({
      runtimes: data.result
    });
  }

  render() {
    const { runtimes, form } = this.state;

    return (
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">首页</a></li>
            <li className="breadcrumb-item active" aria-current="page">创建</li>
          </ol>
        </nav>
        <h3>创建容器环境</h3>
        <form>
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">运行环境</label>
            <div className="col-sm-10">
              <select className="form-select" onChange={e => this.updateRuntime(e.target.value)} value={form.runtime}>
                {runtimes.map(rt =>
                  <option key={rt.id} value={rt.id}>{rt.description}</option>
                )}
              </select>
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">应用名称</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                value={form.name}
                onChange={e => this.updateName(e.target.value)}
                placeholder="应用名称" />
            </div>
          </div>
          {
            form.allowGit &&
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">Git仓库</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  value={form.git}
                  onChange={e => this.updateGit(e.target.value)}
                  placeholder="仓库地址" />
              </div>
            </div>
          }
          <input type="button" className="btn btn-primary" value="提交" onClick={this.submit.bind(this)} />
        </form>
      </div>
    );
  }

  updateRuntime(val: string) {
    const runtime = this.state.runtimes.find(rt => rt.id === val);
    if (!runtime) {
      return;
    }
    const { form } = this.state;
    form.runtime = val;
    form.allowGit = runtime.allowGit;
    this.setState({ form });
  }
  updateName(val: string): void {
    const { form } = this.state;
    form.name = val;
    this.setState({ form });
  }
  updateGit(val: string): void {
    const { form } = this.state;
    form.git = val;
    this.setState({ form });
  }
  submit() {
    const { form } = this.state;
    if (!form.name) {
      return;
    }
    fetch("/api/newContainer", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        cmd: form.allowGit && form.git ? [form.git] : []
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(res => {
      location.href = "/manager/ContainerList";
    })
  }
}
export type CreateContainerProps = {}
export type CreateContainerState = {
  runtimes: Array<GetContainerRuntimesItem>
  form: {
    name: string
    runtime: string
    git?: string
    allowGit?: boolean
  }
}
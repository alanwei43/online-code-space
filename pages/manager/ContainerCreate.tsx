import React from "react";

/** 
 *  
 * @date 2022-05-15 
 */
export default class CreateContainer extends React.Component<CreateContainerProps, CreateContainerState> {
  constructor(props: CreateContainerProps) {
    super(props);
    this.state = {
      // 初始化状态
      runtimes: [{
        id: "node",
        name: "Visual Studio Code"
      }, {
        id: "ideac",
        name: "IDEA Conmmunity"
      }],
      form: {
        name: "",
        runtime: "ideac"
      }
    };
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
                  <option key={rt.id} value={rt.id}>{rt.name}</option>
                )}
              </select>
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">应用名称</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" value={form.name} onChange={e => this.updateName(e.target.value)} />
            </div>
          </div>
          <input type="button" className="btn btn-primary" value="提交" onClick={this.submit.bind(this)} />
        </form>
      </div>
    );
  }

  updateRuntime(val: string) {
    const { form } = this.state;
    form.runtime = val;
    this.setState({ form });
  }
  updateName(val: string): void {
    const { form } = this.state;
    form.name = val;
    this.setState({ form });
  }
  submit() {
    const { form } = this.state;
    if (!form.name) {
      return;
    }
    fetch("/api/newContainer", {
      method: "POST",
      body: JSON.stringify(form),
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
  runtimes: Array<{
    id: string
    name: string
  }>
  form: {
    name: string
    runtime: string
  }
}
import React, { useContext, useEffect, useState } from "react";
import "./EnvironmentVariable.scss";
import { ActionContext, StateContext } from "../../../../../../hooks";
import { IActionModel, IStateModel } from "../../../../../../model/hooks.model";
import EnvironmentItem from "./components/EnvironmentItem";
import BounceLoader from "react-spinners/BounceLoader";
import { ApiService } from "../../../../../../services";

const EnvironmentVariable = () => {
  const { selectedProject, projectLoading } = useContext<IStateModel>(StateContext);
  const { fetchProject } = useContext<IActionModel>(ActionContext);

  const [buildEnv, setBuildEnv] = useState<any[]>([]);
  const [buildEnvKey, setBuildEnvKey] = useState<string>("");
  const [buildEnvValue, setBuildEnvValue] = useState<string>("");
  const [addBuildEnvLoading, setAddBuildEnvLoading] = useState<boolean>(false);
  const [updateBuildEnvLoading, setUpdateBuildEnvLoading] = useState<number>(-1);
  const [removeBuildEnvLoading, setRemoveBuildEnvLoading] = useState<number>(-1);

  useEffect(() => {
    if (selectedProject && selectedProject.env) {
      const envs = Object.keys(selectedProject.env).map((k) => ({
        key: k,
        value: selectedProject.env[k],
      }));
      setBuildEnv(envs);
    }
  }, [selectedProject]);

  const addBuildEnvs = () => {
    setAddBuildEnvLoading(true);
    const newBuildEnvs = [...buildEnv, { key: buildEnvKey, value: buildEnvValue }];
    ApiService.updateProjectEnv(
      selectedProject?._id!,
      mapBuildEnv(newBuildEnvs),
    ).subscribe(
      (result) => {
        setBuildEnvKey("");
        setBuildEnvValue("");
        fetchProject(result.updatedProject._id);
        setAddBuildEnvLoading(false);
      },
      (error) => {
        // eslint-disable-next-line no-console
        console.log(error);
        setBuildEnvKey("");
        setBuildEnvValue("");
        setAddBuildEnvLoading(false);
      },
    );
  };

  const mapBuildEnv = (buildEnv: any[]): any => {
    const buildEnvObj = {};
    buildEnv.forEach((env) => {
      Object.assign(buildEnvObj, { [env.key]: env.value });
    });
    return buildEnvObj;
  };

  const updateEnvs = (
    index: number,
    key: string,
    value: string,
    setEditMode: (flag: boolean) => void,
  ) => {
    setUpdateBuildEnvLoading(index);
    const updatedEnv = buildEnv.map((env, i) =>
      i === index ? { key, value } : env,
    );
    ApiService.updateProjectEnv(
      selectedProject?._id!,
      mapBuildEnv(updatedEnv),
    ).subscribe(
      (result) => {
        setBuildEnvKey("");
        setBuildEnvValue("");
        fetchProject(result.updatedProject._id);
        setUpdateBuildEnvLoading(-1);
        setEditMode(false);
      },
      (error) => {
        // eslint-disable-next-line no-console
        console.log(error);
        setBuildEnvKey("");
        setBuildEnvValue("");
        setUpdateBuildEnvLoading(-1);
        setEditMode(false);
      },
    );
  };

  const removeEnvs = (index: number, setEditMode: (flag: boolean) => void) => {
    setUpdateBuildEnvLoading(index);
    const updatedEnv = buildEnv.filter((env, i) => i !== index);
    ApiService.updateProjectEnv(
      selectedProject?._id!,
      mapBuildEnv(updatedEnv),
    ).subscribe(
      (result) => {
        setBuildEnvKey("");
        setBuildEnvValue("");
        fetchProject(result.updatedProject._id);
        setRemoveBuildEnvLoading(-1);
        setEditMode(false);
      },
      (error) => {
        // eslint-disable-next-line no-console
        console.log(error);
        setBuildEnvKey("");
        setBuildEnvValue("");
        setRemoveBuildEnvLoading(-1);
        setEditMode(false);
      },
    );
  };

  return (
    <div className="EnvironmentVariable">
      <div className="settings-right-container">
        <div className="settings-project-details">
          <div className="settings-project-header">Environment Variables</div>
          <div className="settings-project-body">
            <div className="settings-project-header-subtitle">
              In order to provide your Deployment with Environment Variables at Build
              and Runtime, you may enter them right here, for the Environment of your
              choice.
            </div>
            <div className="settings-project-header-subtitle">
              A new Deployment is required for your changes to take effect.
            </div>
            <div className="settings-project-add-env-container">
              <input
                type="text"
                className="add-env-input"
                placeholder="VARIABLE_NAME"
                value={buildEnvKey}
                onChange={(e) => setBuildEnvKey(e.target.value)}
              />
              <input
                type="text"
                className="add-env-input"
                placeholder="I343SFS33GDSDFS"
                value={buildEnvValue}
                onChange={(e) => setBuildEnvValue(e.target.value)}
              />
              <button
                className="add-env-button"
                disabled={!buildEnvKey || !buildEnvValue}
                onClick={addBuildEnvs}
              >
                {addBuildEnvLoading ? (
                  <BounceLoader size={20} color={"#fff"} loading={true} />
                ) : (
                  "Add"
                )}
              </button>
            </div>
            <div>
              {!projectLoading ? (
                buildEnv.length ? (
                  buildEnv.map((env, i) => (
                    <EnvironmentItem
                      type="filled"
                      index={i}
                      envKey={env.key}
                      envValue={env.value}
                      updateEnvs={updateEnvs}
                      removeEnvs={removeEnvs}
                      updateEnvLoading={updateBuildEnvLoading === i}
                      removeEnvLoading={removeBuildEnvLoading === i}
                    />
                  ))
                ) : null
              ) : (
                <EnvironmentItem
                  type="skeleton"
                  index={1}
                  envKey={""}
                  envValue={""}
                  updateEnvs={updateEnvs}
                  removeEnvs={removeEnvs}
                  updateEnvLoading={updateBuildEnvLoading === 1}
                  removeEnvLoading={removeBuildEnvLoading === 1}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentVariable;

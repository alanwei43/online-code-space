# 用于添加本地deb安装, 方便调试使用
FROM registry.jetbrains.team/p/prj/containers/projector-idea-c:latest

EXPOSE 80 8080 8887
USER root
WORKDIR /app
COPY ./entrypoint.sh ./

ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["https://github.com/alanwei43/next-project.git"]
FROM tensorflow/tensorflow

LABEL maintainer="Shuhei Iitsuka <tushuhei@google.com>"

RUN apt-get update && \
    apt-get install -y git \
        python3 \
        python3-pip \
        apt-utils && \
    apt-get clean

RUN pip3 install -U pip

RUN pip3 --no-cache-dir install \
        tensorflow \
        tensorflowjs

WORKDIR /

RUN git clone --depth 1 https://github.com/tensorflow/hub.git

CMD python3 /hub/examples/image_retraining/retrain.py \
        --how_many_training_steps=10000 \
        --tfhub_module https://tfhub.dev/google/imagenet/mobilenet_v2_140_224/feature_vector/2 \
        --image_dir /data/images \
        --output_labels /data/output_labels.txt \
        --saved_model_dir /data/saved_model && \
    python3 -m tensorflowjs.converters.converter \
        --input_format=tf_saved_model \
        --output_node_names='final_result' \
        --saved_model_tags=serve \
        /data/saved_model/ \
        /data/saved_model_web/